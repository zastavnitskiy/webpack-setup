const path = require("path");
const webpack = require("webpack");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");

const entry = [
  "index",
  "assistant",
  "searchresults",
  "hotel",
  "landing"
].reduce(
  (memo, filename) => {
    memo[filename] = path.resolve(__dirname, "src", filename + ".js");
    return memo;
  },
  {}
);

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "chunk-[name].[chunkhash].js"
  },
  plugins: [
    // This pluging makes hashing consistent across builds, and
    // prevents chunk hash from changing if it's content was not changed.
    new WebpackMd5Hash(),

    //This plugin exports module_id to chunkname mapping into separate
    //manifests file – this way, we don't invalidate common chunk if hashes of
    //chunks are changed
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),

    //move vendor chunks that are used in >3 entries/chunks into vendor chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module, count) {
        //if module is
        return module.resource && (/vendor/).test(module.resource) && count >= 3
      }
    }),

    //create some async chunks if possible
    new webpack.optimize.CommonsChunkPlugin({
      name: "async",
      async: true
    })
  ]
};