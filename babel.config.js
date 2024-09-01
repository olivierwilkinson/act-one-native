module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["import-graphql", ['@babel/plugin-transform-private-methods', { loose: true }], "react-native-reanimated/plugin"]
  };
};
