var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var cfg = require('./webpack.config.js');

cfg.devtool = false;
cfg.output.filename = '[name].min.js';
cfg.output.publicPath = '/scripts/';
cfg.plugins.push(new ExtractTextPlugin('[name].min.css'));
cfg.plugins.push(new webpack.optimize.UglifyJsPlugin());
cfg.plugins.push(new webpack.optimize.DedupePlugin());

cfg.module.loaders[0] = {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!less?strictMath")
}

module.exports = cfg;