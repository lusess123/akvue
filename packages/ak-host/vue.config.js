//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
//import * as buildapp from "ak-dev-node/build/buildapp"
const buildapp = require("ak-dev-node/build/buildapp");


const _apps = buildapp.getApps();

const apps = _apps.filter(app=>{
    //a
      if(app == "1ak-app-dwh")
        return false ;
        else 
        return true ;
});

console.log("apps:");
console.log(apps);
module.exports = {
    configureWebpack: (config) => {
        //debugger;

       

        // console.log("fffff:"+buildapp.getApps());  
        //config.resolve.alias["apps"] = "@/framework/apps";
        config.devtool = 'cheap-module';
        // apps.forEach((app) => {
        //     config.entry[app] = [app];
        // })


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

      const _def =  new webpack.DefinePlugin({
            EXELOADAPPS:`
            import("ak-app-sdk/src/index").then(()=>{});
            `,
            APP_SDK:JSON.stringify("ak-app-sdk/src/index"),
            APP_DWH:JSON.stringify("ak-app-dwh/src/index"),
            APP_APPS:JSON.stringify("ak-app-dwh/src/index|ak-app-sdk/src/index")
          })

          config.plugins.push(_def);
        // config.pl,ugins.push(new webpack.optimize.CommonsChunkPlugin({
        //     name: apps,
        //     minChunks: Infinity
        // }));
        // console.log(config.plugins)

    },
    css: {
        extract: true
    },
    devServer:{
       // proxy: 'http://localhost:4000',
        host: '0.0.0.0',
    port: 8080
    }
}