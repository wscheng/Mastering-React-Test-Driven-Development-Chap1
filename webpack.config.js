// TODO update to ES6
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  // change to .tsx if necessary
  entry: "./src/index.tsx",
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      {
        // 以下的regular expression中的x?代表可以有或沒有x
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/
      },
      // addition - add source-map support
      {
        // TODO 尚未了解enforce功用
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ]
  },
  // Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
  // 這個選項會防止將這些被import到的package打包進去
  //   externals: {
  //     react: "React",
  //     "react-dom": "ReactDOM"
  //   },

  // addition - add source-map support
  // https://webpack.js.org/configuration/devtool/
  // This option controls if and how source maps are generated.
  devtool: "source-map"
};
