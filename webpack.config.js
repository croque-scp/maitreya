const path = require('path')

module.exports = {
  // 1
  entry: {
    'bundle.js': [
      path.resolve(__dirname, './src/maitreya.js'),
      path.resolve(__dirname, './src/LoopService.js'),
    ],
  },
  // 2
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name]',
  },
  // 3
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              query: {
                hash: "sha512",
                digest: "hex",
                name: "[hash].[ext]",
              },
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              query: {
                bypassOnDebug: true,
                optimizationLevel: 7,
                interlaced: false,
              },
            },
          },
        ]
      } 
    ],
  },
};
