import { rest, graphql } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import {
  GetPlayHeader,
  GetPlayHeaderVariables
} from "../../src/components/play/playHeader/types/GetPlayHeader";
import createGetPlayHeader from "../../src/components/play/playHeader/__tests__/factories/createGetPlayHeader";
import {
  GetPlay,
  GetPlayVariables
} from "../../src/graphql/queries/types/GetPlay";
import { GetPlays } from "../../src/graphql/queries/types/GetPlays";
import { GetUser } from "../../src/graphql/queries/types/GetUser";
import createGetPlay from "../graphql/factories/createGetPlay";
import { line, otherLine } from "../graphql/mocks/line";
import { lineRow, otherLineRow } from "../graphql/mocks/lineRow";
import { otherPlay, play } from "../graphql/mocks/play";
import { scene } from "../graphql/mocks/scene";

export const initialHandlers = [
  graphql.query<GetUser>("GetUser", (_, res, ctx) =>
    res(ctx.data({ user: null }))
  ),
  graphql.query<GetPlays>("GetPlays", (_, res, ctx) =>
    res(ctx.data({ plays: [play, otherPlay] }))
  ),
  graphql.query<GetPlay, GetPlayVariables>("GetPlay", (req, res, ctx) =>
    res(
      ctx.data(
        createGetPlay(req.variables, [
          {
            ...scene,
            lines: [
              { ...line, lineRows: [lineRow] },
              { ...otherLine, lineRows: [otherLineRow] }
            ]
          }
        ])
      )
    )
  ),
  graphql.query<GetPlayHeader, GetPlayHeaderVariables>(
    "GetPlayHeader",
    (req, res, ctx) => res(ctx.data(createGetPlayHeader(req.variables)))
  ),
  rest.get(new RegExp(".*/api/v3/subscriptions"), async (_, res, ctx) => {
    return res(ctx.status(200));
  })
];

let server: SetupServerApi;

beforeAll(() => {
  server = setupServer(...initialHandlers);
  server.on("request:unhandled", req => {
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
