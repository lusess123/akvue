//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
//import * as buildapp from "ak-dev-node/build/buildapp"
const buildapp = require("ak-dev-node/build/buildapp");


const apps = buildapp.getApps();
console.log("apps:");
console.log(apps);
const _va = process.env;
console.log(_va);
console.log(process);
module.exports = {
    configureWebpack: (config) => {
        debugger;
       // config.entry.app[0] = "./src/main.js";
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
       console.log(config.module.rules)

    },
    css: {
        extract: true
    }
}