module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [["react-native-reanimated/plugin"],
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false,
    }],
    ["module-resolver", {
      root: ["."],
      alias: {
        "@components": "./src/components",
        "@hooks": "./src/hooks",
        "@router": "./src/router",
        "@constants": "./src/constants",
        "@services": "./src/services",
        "@models": "./src/models",
        "@store": "./src/store",
        "@assets": "./assets",
      },
    }],
  ],
};
