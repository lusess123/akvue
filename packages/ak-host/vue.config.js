//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    configureWebpack: (config) => {
        debugger;
        //config.resolve.alias["apps"] = "@/framework/apps";
        config.devtool = 'cheap-module';
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
       
        console.log(config.resolve.alias)

    },
    css: {
        extract: true
    }
}