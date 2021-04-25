const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const TerserPlugin = require("terser-webpack-plugin")

const dev = process.env.NODE_ENV === "development"

module.exports = {
  mode: process.env.NODE_ENV,
  ...(dev ? { devtool: "eval-source-map" } : {}),
  entry: {
    // main: "./src/index.ts",
    editor: "./src/editor/index.ts",
  },
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
  optimization: {
    minimize: !dev,
    minimizer: [new TerserPlugin({ extractComments: false })],
    usedExports: true,
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   title: "Maitreya.aic",
    //   filename: "index.html",
    //   chunks: ["main"],
    //   meta: {
    //     viewport: "width=device-width, initial-scale=1",
    //   },
    // }),
    new HtmlWebpackPlugin({
      title: "Events editor",
      filename: "editor/index.html",
      chunks: ["editor"],
      meta: {
        viewport: "width=device-width, initial-scale=1",
      },
    }),
  ],
}
