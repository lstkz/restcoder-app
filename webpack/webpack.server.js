var webpack       = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path          = require("path");
var fs            = require("fs");


var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
const babelLoaderQuery = {"plugins":["transform-runtime","add-module-exports","transform-decorators-legacy","transform-react-display-name","typecheck",["react-transform",{"transforms":[{"transform":"react-transform-catch-errors","imports":["react","redbox-react"]},{"transform":"react-transform-hmr","imports":["react"],"locals":["module"]}]}]],"presets":["react","es2015","stage-0"]};


module.exports = {
  target:  "node",
  cache:   false,
  context: __dirname,
  debug:   false,
  devtool: "source-map",
  entry:   ["../bin/server"],
  output:  {
    path:          path.join(__dirname, "../static/dist"),
    filename:      "server.js"
  },
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEVELOPMENT__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
  ],
  module:  {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.less$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ],
    postLoaders: [
    ],
    noParse: /\.min\.js/
  },
  externals: [nodeExternals({
    whitelist: ["webpack/hot/poll?1000"]
  })],
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules",
      "static"
    ],
    extensions: ["", ".json", ".js"]
  },
  node:    {
    __dirname: true,
    fs:        "empty"
  }
};