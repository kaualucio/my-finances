module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', "module:metro-react-native-babel-preset"],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      'react-native-reanimated/plugin',
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "react-native-dotenv",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
    ]
  };
};
