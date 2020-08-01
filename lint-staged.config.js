const javascriptLinters = [
  "prettier --write",
  "eslint --fix",
  "yarn test --findRelatedTests --bail",
  "git add"
];
const typescriptLinters = filenames => [
  "yarn check-types",
  ...javascriptLinters.map(command => `${command} ${filenames.join(" ")}`)
];

module.exports = {
  "**/*.ts?(x)": typescriptLinters,
  "**/*.js?(x)": javascriptLinters,
  "**/*.(json|md)": ["prettier --write", "git add"]
};
