module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [["react-native-reanimated/plugin"],
    ["module:react-native-dotenv"],
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
