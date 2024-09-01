const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: { sourceExts }
} = defaultConfig;

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...sourceExts, "gql", "graphql"]
  }
};
