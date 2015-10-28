//var webpack = require("webpack");
//var path = require('path');

module.exports = {
//    entry: "./js/app.js",
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "./bundle.js"
    },
    resolve: {
//        root: path.resolve('./'),
//        alias: {
//          wysiwyg: "js/../../bower_components/bootstrap-wysiwyg/bootstrap-wysiwyg.js",
//          hotkeys: "js/../../bower_components/bootstrap-wysiwyg/external/jquery.hotkeys.js",
//          fullcalendar: "js/../../bower_components/fullcalendar/dist",
//          elastic: "js/../../app/js/lib/jquery.elastic.source.js",
//          'jm-wraps': "js/sections/wraps",
//          'jm-modules': "js/sections/modules",
//          'jm-apis': "js/components/apis",
//          'jm-global': "js/components/global",
//          'jm-widgets': "js/components/widgets"
//        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel?stage=1" }
        ],
    },
};