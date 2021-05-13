const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const TerserPlugin = require("terser-webpack-plugin")

const dev = process.env.NODE_ENV === "development"

const common = {
  context: path.resolve(__dirname, "."),
  mode: process.env.NODE_ENV,
  ...(dev ? { devtool: "eval-source-map" } : {}),
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.ts$/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.(woff2?|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
  ],
}

const mainWeb = merge(common, {
  entry: {
    mainWeb: "./src/index.ts",
  },
  optimization: {
    minimize: !dev,
    minimizer: [new TerserPlugin({ extractComments: false })],
    usedExports: true,
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Maitreya.aic",
      filename: "index.html",
      chunks: ["main"],
      meta: {
        viewport: "width=device-width, initial-scale=1",
      },
    }),
  ],
})

const editorElectronMain = merge(common, {
  entry: {
    editorElectronMain: "./src/editor/electron.ts",
  },
  target: "electron-main",
  output: {
    filename: "editorElectron.js",
  },
})

const editorElectronPreload = merge(common, {
  entry: {
    editorElectronPreload: "./src/editor/preload.ts",
  },
  target: "electron-preload",
  output: {
    filename: "editorPreload.js",
  },
})

const editorElectronRenderer = merge(common, {
  entry: {
    editorElectronRenderer: "./src/editor/renderer.ts",
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Events editor",
      template: "./src/editor/index.html",
    }),
  ],
})

module.exports = [
  // mainWeb,
  editorElectronMain,
  editorElectronPreload,
  editorElectronRenderer,
]
