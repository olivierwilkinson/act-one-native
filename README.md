# ActOne

ActOne is in the expo managed workflow, using a bare typescript template.

The expo-cli is needed to run certain npm scripts.

expo-cli installation instructions can be found here:
https://docs.expo.io/versions/latest/get-started/installation/

## Usage

install dependencies: `yarn`

start dev server: `yarn dev`

run tests: `yarn test`

check types: `yarn check-types`

## Committing

There are a number of pre-commit hooks installed with the repo. The goal of the
hooks are to ensure each commit:

- has consistent style
- does not have build errors
- does not have type errors
- passes the tests

### Good to know

The `yarn check-types` script that is used in the pre-commit hook always checks
the entire project. The reason is because it does a compilation dry-run. This
means you may need to add what you want to staging and then
`git stash save --keep-index` to prevent the script from checking work that is
in progress.

## Architecture

The entry-point for the app is `App.tsx` in the top-level directory. It is not
possible to change this due to expo assumptions.

App defines the navigation stack and should also hold the state for any
application-wide contexts, e.g. a UserContext.

The components App adds to the stack are held in the screens directory e.g.
Home, Play etc.

Each screens core logic should reside in these screen components. See
`screens/Play.tsx`.

Components are found in the components directory, these are organised by screen,
with components that need to be shared between screens living in the `common`
folder.

## Style

The project uses styled-components. If there are styles that should be shared
between components these should live in the `src/styles` directory e.g.
`typography.ts`

## Types

Types should be co-located where possible, but for global types rather than
using the `declare` keyword we should add them to the `src/types` folder.
Then they can be imported like any other module. see `src/types/play-types.d.ts`

## Tests

Tests should be co-located with the file they are testing.
Tests use `react-native-testing-library` for rendering and querying.
Navigation is tested in App.tsx tests.

## Plays

Plays are stored in JSON format and are found in the `src/data/plays` directory.
There are a number of unformatted plays found under `src/data/plays/unformatted`.
These plays can be converted into the correct format using
`scripts/format-script.js`. The plays have been auto-generated by someone else
so there is no guarantee the script is good after putting it through the format
script, each will need proof reading.
