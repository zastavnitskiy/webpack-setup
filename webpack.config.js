const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const entry = ['index', 'assistant', 'searchresults', 'hotel'].reduce((memo, filename) => {
  memo[filename] = path.resolve(__dirname, 'src', filename + '.js');
  return memo;
}, {});

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      minChunks: 3,
    })
  ]
};
