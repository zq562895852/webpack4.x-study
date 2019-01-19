let utils = require('./utils');
let path = require('path')
let vueLoaderConfig = require('./vue.loader.conf')
let filepath = utils.getFilesPath('src/page');
let ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('../config');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
// 入口
let mainEntry = utils.getFilesPath('src/main');
// 第一个参数入口文件夹，第二个参数项目文件夹
let entrys = utils.getEntrys(mainEntry, 'webpack/');
console.log(entrys);
// 获取html模板  第一个参数模板文件夹，第二个参数项目文件夹
// let html = utils.getHtmlTemplate(filepath, 'webpack/');
// console.log(html);
// process.env.NODE_ENV 可以用插件配置全局的环境变量；在npm run dev/build 中可以配置
console.log('process.env.NODE_ENV :', process.env.NODE_ENV);
module.exports = {
    // 上下文
    context: path.resolve(__dirname, '../'),
    // 入口
    entry:{
        // commons:['jquery'],
        ...entrys,
        
    } ,
    // 输出
    // output: {
    //     filename: '[name].js',
    //     // chunkFilename: "[name].chunk.js",
    //     path: config.build.assetsRoot,
    //     publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    // },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                include: [resolve('src')], // 只转化src目录下的js 
                exclude: /node_modules/, // 排除掉node_modules，优化打包速度
                use: {
                    loader: 'babel-loader',
                  }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                // options: vueLoaderConfig
              },
            // {
            //     test: /\.less$/,
            //     use: ExtractTextWebapckPlugin.extract({
            //         fallback: 'style-loader',
            //         // publicPath: '../../',
            //         use: [
            //             'css-loader',
            //             'postcss-loader',
            //             'less-loader'
            //         ]
            //     })
            // },
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: './src/page/home/home.html'
    //     })
    // ]

}