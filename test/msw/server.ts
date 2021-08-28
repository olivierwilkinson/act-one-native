import { rest, graphql } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import {
  GetLine,
  GetLineVariables
} from "../../src/components/play/line/types/GetLine";
import createGetLine from "../../src/components/play/line/__tests__/factories/createGetLine";
import {
  GetLineHeader,
  GetLineHeaderVariables
} from "../../src/components/play/lineHeader/types/GetLineHeader";
import createGetLineHeader from "../../src/components/play/lineHeader/__tests__/factories/createGetLineHeader";
import {
  GetPlayHeader,
  GetPlayHeaderVariables
} from "../../src/components/play/playHeader/types/GetPlayHeader";
import createGetPlayHeader from "../../src/components/play/playHeader/__tests__/factories/createGetPlayHeader";
import {
  GetScene,
  GetSceneVariables
} from "../../src/components/play/scene/types/GetScene";
import createGetScene from "../../src/components/play/scene/__tests__/factories/createGetScene";
import {
  GetPlay,
  GetPlayVariables
} from "../../src/graphql/queries/types/GetPlay";
import { GetPlays } from "../../src/graphql/queries/types/GetPlays";
import { GetUser } from "../../src/graphql/queries/types/GetUser";
import createGetPlay from "../graphql/factories/createGetPlay";
import { line, otherLine, sceneDirectionLine } from "../graphql/mocks/line";
import {
  lineRow,
  otherLineRow,
  sceneDirectionLineRow
} from "../graphql/mocks/lineRow";
import { otherPlay, play } from "../graphql/mocks/play";
import { actTwoScene, otherScene, scene } from "../graphql/mocks/scene";

const sceneLines = [{ ...line, lineRows: [lineRow] }];
const otherSceneLines = [{ ...otherLine, lineRows: [otherLineRow] }];
const actTwoSceneLines = [
  { ...sceneDirectionLine, lineRows: [sceneDirectionLineRow] }
];

export const initialHandlers = [
  graphql.query<GetUser>("GetUser", (_, res, ctx) =>
    res(ctx.data({ user: null }))
  ),
  graphql.query<GetPlays>("GetPlayListContainer", (_, res, ctx) =>
    res(ctx.data({ plays: [play, otherPlay] }))
  ),
  graphql.query<GetPlay, GetPlayVariables>("GetPlay", (req, res, ctx) =>
    res(
      ctx.data(
        createGetPlay(req.variables, [
          { ...scene, lines: sceneLines },
          { ...otherScene, lines: otherSceneLines },
          { ...actTwoScene, lines: actTwoSceneLines }
        ])
      )
    )
  ),
  graphql.query<GetScene, GetSceneVariables>("GetScene", (req, res, ctx) => {
    if (req.variables.where.id === scene.id) {
      return res(ctx.data({ scene: { ...scene, lines: sceneLines } }));
    }
    if (req.variables.where.id === otherScene.id) {
      return res(
        ctx.data({ scene: { ...otherScene, lines: otherSceneLines } })
      );
    }
    if (req.variables.where.id === actTwoScene.id) {
      return res(
        ctx.data({ scene: { ...actTwoScene, lines: actTwoSceneLines } })
      );
    }
    return res(ctx.errors([{ message: "Unable to find scene" }]));
  }),
  graphql.query<GetPlayHeader, GetPlayHeaderVariables>(
    "GetPlayHeader",
    (req, res, ctx) => res(ctx.data(createGetPlayHeader(req.variables)))
  ),
  graphql.query<GetScene, GetSceneVariables>("GetScene", (req, res, ctx) =>
    res(ctx.data(createGetScene(req.variables)))
  ),
  graphql.query<GetLine, GetLineVariables>("GetLine", (req, res, ctx) =>
    res(ctx.data(createGetLine(req.variables)))
  ),
  graphql.query<GetLineHeader, GetLineHeaderVariables>(
    "GetLineHeader",
    (req, res, ctx) => res(ctx.data(createGetLineHeader(req.variables)))
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
