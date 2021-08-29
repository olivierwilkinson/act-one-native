const javascriptLinters = [
  "eslint --fix",
  "prettier --write",
  "yarn test --findRelatedTests --bail",
  "git add"
];
const typescriptLinters = filenames => [
  "yarn typecheck",
  ...javascriptLinters.map(command => `${command} ${filenames.join(" ")}`)
];

module.exports = {
  "**/*.ts?(x)": typescriptLinters,
  "**/*.js?(x)": javascriptLinters,
  "**/*.(json|md)": ["prettier --write", "git add"]
};
