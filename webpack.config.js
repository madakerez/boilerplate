var path = require('path');
var webpack = require('webpack');

var ctxPath = path.resolve(__dirname);


module.exports = {
    context: ctxPath,
    resolve: {
        modulesDirectories: ["node_modules"],
        alias: {
            "TweenLite": "gsap/src/uncompressed/TweenLite.js",
            "TweenMax": "gsap/src/uncompressed/TweenMax.js",
            "alertify": "alertifyjs/build/alertify.js"
        }
    },
    entry: {
        'app': path.resolve(__dirname, 'fe-src/app.js')
    },
    output: {
        path: path.resolve(__dirname, '../web/js/bundle'),
        filename: '[name].js'
    },
    module: {
        noParse: ['node_modules'],
        loaders: [
            {
                test: /\.less$/,
                loaders: ["style", "css", "autoprefixer?browsers=last 2 version", "less?strictMath"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.hbs/,
                loader: "handlebars-template-loader"
            }
        ]
    },
    node: {
        fs: "empty" // avoids error messages
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};