const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: { sourceExts }
} = defaultConfig;

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve(
      "@bam.tech/react-native-graphql-transformer"
    )
  },
  resolver: {
    sourceExts: [...sourceExts, "gql", "graphql"]
  }
};
