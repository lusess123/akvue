//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
//import * as buildapp from "ak-dev-node/build/buildapp"
const buildapp = require("ak-dev-node/build/buildapp");


const apps = buildapp.getApps();
console.log("apps:");
console.log(apps);
module.exports = {
    configureWebpack: (config) => {
        debugger;

     // console.log("fffff:"+buildapp.getApps());  
        //config.resolve.alias["apps"] = "@/framework/apps";
        config.devtool = 'cheap-module';
        apps.forEach((app) => {
            config.entry[app] = [app];
        })


        config.resolve.alias = {
            ...config.resolve.alias,
            ...{
                // apps: "@/framework/apps",
                // biz: "@/framework/biz",
                // comp: "@/framework/comp",
                //  web: "akweb",
                // col: "@/framework/col",
                // 'vue': 'vue/dist/vue.esm.js'
                'vue$': 'vue/dist/vue.esm.js',
            }
        };
        config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: apps,
            minChunks: Infinity
        }));
       // console.log(config.plugins)

    },
    css: {
        extract: true
    }
}