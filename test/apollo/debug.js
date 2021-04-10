if (process.env.DEBUG_APOLLO || process.env.DEBUG_QUERY) {
  jest.mock("@apollo/client", () => {
    const logToFile =
      !!process.env.DEBUG_APOLLO &&
      process.env.DEBUG_APOLLO.toLowerCase() === "file";

    const fs = jest.requireActual("fs");
    const path = jest.requireActual("path");
    const util = jest.requireActual("util");
    const { useRef } = jest.requireActual("react");
    const { print } = jest.requireActual("graphql/language/printer");
    const { default: usePrevious } = jest.requireActual(
      "../../src/hooks/usePrevious"
    );

    // create folder for log files if it is needed
    if (logToFile) {
      fs.mkdirSync("debug-apollo", { recursive: true });
    }

    // state that needs to be kept for entire test suite
    let stream;
    let currentTestName;

    function createStream() {
      if (logToFile) {
        return fs.createWriteStream(
          path.join(
            "debug-apollo",
            `${global.jasmine.testPath.split("/").pop()}.log`
          ),
          { flags: "w" }
        );
      }

      return process.stdout;
    }

    function write(log) {
      if (!stream) {
        stream = createStream();
      }

      // if currentTestName changes write test header to the stream
      if (currentTestName !== expect.getState().currentTestName) {
        ({ currentTestName } = expect.getState());
        stream.write(`Test Start: ${currentTestName}\n\n`);
      }

      stream.write(log);
    }

    function useHookResultSpy(result) {
      const spy = useRef(jest.fn()).current;

      if (!Array.isArray(result)) {
        return result;
      }

      const [mutation, ...remainingResult] = result;
      return [spy.mockImplementation(mutation), ...remainingResult];
    }

    function getComponentFileName() {
      return new Error().stack
        .split("at ")[3]
        .split("/")
        .pop()
        .split(":")[0];
    }

    function stringifyQuery(definition) {
      return print(definition).split("{")[0];
    }

    function extractMutationVariables(result) {
      if (!Array.isArray(result)) {
        return;
      }

      try {
        const [{ mock }] = result;
        return mock.calls[mock.calls.length - 1][0].variables;
      } catch (_) {
        return undefined;
      }
    }

    function getStateFromResult(result) {
      if (Array.isArray(result)) {
        // TODO:- include variables from useMutation options
        return {
          variables: extractMutationVariables(result),
          ...result[1]
        };
      }
      return result || {};
    }

    function inspectState(state) {
      const { variables, loading, error, data } = state;
      return util.inspect(
        { variables, loading, error, data },
        { depth: null, colors: !logToFile }
      );
    }

    function createDebugHook(hook) {
      return function useDebugHook(...args) {
        const result = useHookResultSpy(hook(...args));

        const [queryDefinition] = args;
        const query = stringifyQuery(queryDefinition);
        const state = getStateFromResult(result);
        const log = `${getComponentFileName()} ${query} ${inspectState(
          state
        )}\n\n`;
        const previousLog = usePrevious(log);
        const { skip } = args[1] || {};

        if (
          state.called &&
          log !== previousLog &&
          !skip &&
          (!process.env.DEBUG_QUERY || query.includes(process.env.DEBUG_QUERY))
        ) {
          write(log);
        }

        return result;
      };
    }

    const ApolloClient = jest.requireActual("@apollo/client");
    return {
      __esModule: true,
      ...ApolloClient,
      useQuery: createDebugHook(ApolloClient.useQuery),
      useMutation: createDebugHook(ApolloClient.useMutation)
    };
  });
}
