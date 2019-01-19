let webpackBaseConf = require('./webpack.base.conf');
let webpack = require('webpack');
let path = require('path');
let merge = require('webpack-merge');
let utils = require('./utils');
let filepath = utils.getFilesPath('src/page');
let htmls = utils.getHtmlTemplate(filepath, 'webpack/', 'src/');
// let HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let htmlplugs = utils.plugs(htmls);
let config = require('../config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = merge(webpackBaseConf, {
    mode: 'development',
    module:{
        rules:utils.styleLoaders({
            sourceMap:config.dev.cssSourceMap
        })
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        publicPath: '/', //必须是根目录
        // watchContentBase: true,
        // watchOptions: {
        //     poll: true
        // },
        host: "127.0.0.1", //如果希望通过ip访问则设置为 '0.0.0.0' 或者用这个useLocalIp: true
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启自动打开浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true, // 开启热更新
        port: 9000,
        // info: false,
        progress: true, //输出进度
        historyApiFallback: {
            // 多页面下打开指定的页面 默认情况下打开的是index.html,多页面根目录下没有index.html所以打开指定的页面
            rewrites: [{
                from: /^\/$/,
                to: '/page/home/home.html'
            }]
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new MiniCssExtractPlugin({
            filename:utils.assetsPath('css/[name].[hash].css'),
            chunkFilename:utils.assetsPath('css/[id].[hash].css')
        }),
        new VueLoaderPlugin(),

        ...htmlplugs
    ]
})