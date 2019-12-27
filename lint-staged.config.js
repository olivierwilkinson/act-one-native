const javascriptLinters = ["eslint --fix", "prettier --write", "git add"];
const typescriptLinters = filenames => [
  "yarn check-types",
  ...javascriptLinters.map(command => `${command} ${filenames.join(" ")}`)
];

module.exports = {
  "**/*.ts?(x)": typescriptLinters,
  "**/*.js?(x)": javascriptLinters,
  "**/*.(json|md)": ["prettier --write", "git add"]
};
