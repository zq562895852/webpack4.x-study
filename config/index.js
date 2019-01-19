let path = require('path');

// 区分dev和build
module.exports = {

    dev: {
        env: require('./dev.env'),

        // 静态资源文件
        assetsSubDirectory: 'static',
        // dev环境下这里一定是根目录
        assetsPublicPath: '/',
        cssSourceMap: false,
        devtool: 'eval',
        // / https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,
        proxyTable: {

        }
        // 
    },
    build: {
        env: require('./prod.env'),
        // 打包输出文件
        assetsRoot: path.resolve(__dirname, '../demo'),
        // 打包静态文件名
        assetsSubDirectory: 'static',
        // 相当于打包路径html模板引入静态资源的路径
        assetsPublicPath: '../../',
        // productionSourceMap: true,
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // 开启压缩
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // bundleAnalyzerReport: process.env.npm_config_report

    }

}