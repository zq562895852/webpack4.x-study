let webpackBaseConfig = require('./webpack.base.conf');
let utils = require('./utils');
let webpack = require('webpack');
let path = require('path');
let merge = require('webpack-merge');
let filepath = utils.getFilesPath('src/page');
let htmls = utils.getHtmlTemplate(filepath, 'webpack/', 'src/');
// let HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let htmlplugs = utils.plugs(htmls);
// 引入打包相关信息
let config = require('../config');
const env = config.build.env;
// 打包前删除之前打包得文件
let cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log('assetepath', utils.assetsPath('js/[name].[chunkhash].js'));

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = merge(webpackBaseConfig, {
    mode: 'production', //新增环境
    output: {
        path: config.build.assetsRoot,
        // 这里的路径是相对路径，把静态文件提取到公共的文件夹下 static/js/[name].[chunkhash].js
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    module: {
        rules:utils.styleLoaders({
            sourceMap:config.build.productionSourceMap
        })
    },
    optimization: {
         splitChunks: {
            chunks: 'all',
            name:true,//"commons"   
            // minChunks:1,
            /*
               切记：多个入口引入的第三方库不能用同一个名字，比如commons会重复打包造成代码出错，要分开命名commons模块 也就是入口不能都用commons这一个名字，最坑的是这里还不能配置多个，         如果是多页面，此处一定是html配置中的chunks否则不会自动引入到js里面，
               这个name 一定是和插入html中的chunks 的commons 一致，目前多页面发现是这个，其他还未知  而且打包不能重新命名，命名也无效，不知道是不是配置没找到
               name:'commons',
               new HtmlWebpackPlugin({
                filename: html.filename,
                template: html.template,
                inject: true,
                // favicon: "favicon.ico",
                chunks: ['commons',html.entryname],
                // minify:{//主要压缩html
                //     removeRedundantAttributes:true, // 删除多余的属性
                //     collapseWhitespace:true, // 折叠空白区域
                //     removeAttributeQuotes: true, // 移除属性的引号
                //     removeComments: true, // 移除注释
                //     collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
                // },
            })
            */
            cacheGroups:{
                vendor:{
                    // test: /vue/,//jquery
                    test: /[\\/]node_modules[\\/]/,
                    chunks:'all',
                    minChunks:1,
                    name:"commons",//无法理解，暂时写到这
                },
                // index:{
                //     // test: /vue/,//jquery
                //     test: /[\\/]node_modules[\\/]/,
                //     chunks:'all',
                //     minChunks:1,
                //    // name:"indexcommons",
                // },
                // index: {
                //     test: /vue/,
                //     chunks:'all',
                //     name:"indexcommons",
                //     minChunks:1,
                // },
                // 多入口的 key  home/index
                // home: {
                //     test: /jquery/,//此处如果配置node_modules会重复打包其他模块，必须精确匹配包名，而且多入口的引入包要独立，相同包会抽离，但不会引入
                //     // test: /[\\/]node_modules[\\/]/,
                //     chunks:'all',
                //     minChunks:1,
                //     name:'homecommons'  //这个名字和html-plugin 中的chunks  homecommons/indexcommons 必须一致否则无法自动引入抽离的js,而且会默认打包其他入口相同的引入包  造成报错
                // },
        //         default: {
        //             minChunks: 1,
        //             priority: -20,
        //             reuseExistingChunk: true,
        //         },
                
            }
          },
        //   runtimeChunk: true,
        // minimize: true,
        minimizer: [ // 用于配置 minimizers 和选项
            new UglifyJsPlugin({//如果要压缩js这里必须配置，因为开启压缩css时，js默认不会压缩
                // uglifyOptions:{
                //     ie8: false,
                //     ecma: 8,
                //     parse: {},
                //     mangle: {
                //         properties: {
                //         // mangle property options
                //         }
                //     },
                //     output: {
                //         comments: false,
                //         beautify: false,
                //     },
                //     compress: false,
                //     warnings: false

                // },
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})//这里是压缩css
        ],
        
    },
    plugins: [
        //删除打包文件夹 第一个参数是个数组，数组里是文件名，
        new cleanWebpackPlugin(['demo'], {
            // 默认__dirname;
            root: path.resolve(__dirname, '..'),
        }),
        new VueLoaderPlugin(),
        // new webpack.ProvidePlugin({
        //     Vue: 'vue',
        //     // jQuery: 'jquery'
        //   })  ,
        // 这里注意  hash  chunkhash  contenthash  区别，使用chunkhash没有改变的文件不会重新生成hash可以缓存，但是如果js发生变化css没有变化依然会重新生成css的hash值，所以这里可以用contenthash  生产环境可配置，开发环境下可以不用hash
        new MiniCssExtractPlugin({
            filename:utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename:utils.assetsPath('css/[id].[contenthash].css')
        }),

        ...htmlplugs,
    ]


})