let path = require("path");
let glob = require("glob");
// let fs = require("fs");
let config = require('../config');
let HtmlWebpackPlugin = require("html-webpack-plugin");
// let ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');由于之前的配置不支持webpack4.x所以用这个插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 读取文件路径
exports.getFilesPath = function (filespath) {
    return path.join(__dirname, "..", filespath);
};
// 获取入口
exports.getEntrys = function (filespath, filename) {
    let entries = {};
    glob.sync(filespath + "/**/*.js").forEach(entry => {
        let basename = path.basename(entry, path.extname(entry));
        console.log(basename);
        // 这里一定要带./
        entries[basename] = "./" + entry.split(filename)[1];
    });
    return entries;
};
// 获取模板
exports.getHtmlTemplate = function (filespath, filename, htmlDir) {
    let htmlTemplate = [];
    glob.sync(filespath + "/**/*.html").forEach(html => {
        let baseHtml = path.basename(html, path.extname(html));
        if (html) {
            let htmlObj = new Object();
            htmlObj.entryname = baseHtml; // 入口对应的文件
            htmlObj.filename = html.split(htmlDir)[1]; //生成的模板文件
            htmlObj.template = html.split(filename)[1]; //使用的模板文件
            htmlTemplate.push(htmlObj);
        }
    });
    return htmlTemplate;
};
exports.plugs = function (file) {
    let htmlPlugs = [];
    file.forEach(html => {
        htmlPlugs.push(
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
        );
    });
    return htmlPlugs;
};
// 打包的路径
exports.assetsPath = function (_path) {
    let assetsSubDirectory =
        process.env.NODE_ENV === "production" ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory;
    // console.log('object :', object);
    return path.posix.join(assetsSubDirectory, _path);
};

// 配置各种css-loader加载器   process.env.NODE_ENV === 'production'
exports.cssLoaders= function (options) {
    options = options || {};
    let miniCssLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            // publicPath: '../'
        }
    }
    let cssLoader = {
        loader:'css-loader',
        // options:{
        //     minimize:true,
        //     sourceMap:options.sourceMap
        // }
    };
    let postcssLoader = {
        loader:'postcss-loader'//主要用来生成浏览器前缀以兼容
    };
    // 生成loaders
    const generateLoaders=(loader,loaderOptions)=>{
        //   必须有cssloader
        // 推荐在其他加载器less-loader/sass。。。之前使用postcss-loader,官网推荐，
        
        let loaders = [cssLoader,postcssLoader];//默认有一个cssloader
        if(loader){
            loaders.push({
                loader:loader+'-loader',
                // 合并loader参数配置
                // options:Object.assign({},loaderOptions,{
                //     sourceMap:options.sourceMap
                // })
            })
        };
        // 抽离css
        // console.log('loaders :', loaders);
        return [MiniCssExtractPlugin.loader,...loaders]

    }
    return {
        css:generateLoaders(),
        // postcss:generateLoaders(),
        less:generateLoaders('less'),
        sass:generateLoaders('sass'),
        scss:generateLoaders('scss'),
        stylus:generateLoaders('stylus'),
        styl:generateLoaders('stylus')
    }
   
}
exports.styleLoaders=(options)=>{
  let output = [];
  let loaders = exports.cssLoaders(options);
/*   loaders 数据结构如  {
                        css:ExtractTextWebapckPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader:'css-loader',
                                    options:{}
                                },
                                {
                                    loader:'postcss-loader'
                                }
                            ]
                            });
                        less:ExtractTextWebapckPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader:'css-loader',
                                    options:{}
                                },
                                {
                                    loader:'postcss-loader'
                                },
                                {
                                    loader:'less-loader',
                                    options:{}
                                }
                            ]
                            });
                         }
*/
//   console.log('loaders :', loaders);
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
//   console.log('output :', output);
  return output;
}

// 提取公共代码的入口
// let mainEntry = utils.getFilesPath('src/main');
// // 第一个参数入口文件夹，第二个参数项目文件夹
// let entrys = utils.getEntrys(mainEntry, 'webpack/');
exports.getEntrysName = ()=>{
    let entries = exports.getEntrys(path.join(__dirname, "..", "src/main"),'webpack/');
    console.log('entries :', entries);
    let output = [];
    if(entries){
        for (const key in entries) {
            // console.log('key :', key);
            let obj = new Object();
            obj.priority= 0;// 缓存组优先级
            obj[key] = { // key 为entry中定义的 入口名称
                chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
                test: /react | vue/, // 正则规则验证，如果符合就提取 chunk
                name: "common", // 要缓存的 分隔出来的 chunk 名称 
                minSize: 30000,
                minChunks: 1,
                enforce: true,
                maxAsyncRequests: 5, // 最大异步请求数， 默认1
                maxInitialRequests : 3, // 最大初始化请求书，默认1
                reuseExistingChunk: true // 可设置是否重用该chunk
            }
            output.push(obj);
        }
    };
    // console.log('output :', output);
    return output;
}
// console.log(entrys);