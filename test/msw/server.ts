import { rest, graphql } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

export const initialHandlers = [
  rest.get(new RegExp(".*/api/v3/subscriptions"), async (_, res, ctx) => {
    return res(ctx.status(200));
  }),
];

let server: SetupServerApi;

beforeAll(() => {
  server = setupServer(...initialHandlers);
  server.on("request:unhandled", (req) => {
    console.error(
      `Unmocked ${req.method} request found:`,
      req.url.toJSON(),
      req.body
    );
  });
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest, graphql };
