## webpack4.x 学习总结


### 首先dev环境多数是没有问题，出问题都在prod环境
+ dev环境配置目录切记是根目录 `publicPath: '/',` 必须是根目录    ./都不行
+ loader加载器和prod一样即可， bable-loader 转化node_modules下报错，可能有些已经压缩过，会报错
+ dev代理，包括默认打开一个页面(多页面)，热重载，都非常简单，基本上看文档dev就能跑起来

### 主要说一下prod环境
+ `webpack4.x` 新增mode,optimization配置项，当然还有其他的。
+ `mini-css-extract-plugin`插件抽离css打包成单独的css文件
   - 坑一:`webpack4.x` 默认开启了压缩，所以当使用这个插件时，默认配置无效了，所以要手动压缩，也是相当坑了，
   - 坑二:使用`optimize-css-assets-webpack-plugin`压缩css同时要开启压缩js插件`uglifyjs-webpack-plugin`,
   - 坑三:压缩js代码造成js无法使用，打包之后页面打不开，个人猜测这个可能和`splitChunks`有关，但是经过我后来重试，一切又变正常了，不知道是不是拆分代码有影响，这里贼坑，
   - 坑四:`splitChunks`配置外层name设置成true问题不大 `cacheGroups`中的name属性 **注意:是name属性**  必须和`html-webpack-plugin`中的chunks包含一个相同的名字才能抽离并引入到页面中，不同不会自动引入，手动引入js不能用，不知为何，这里的坑是最多的，多页面下抽离js不怎么智能，无法根据引入的js单独打包，而是把多个入口引入的js打包成一个文件，而且有时候页面中不能正常引入js,这里的坑真是千千万，不知是我没配好还是就是这样，抽离出来的js无法重新命名，生成的单独文件就是一个数字加hash值生成的，不知是不是和`js/[id].[chunkhash].js`id有关，总之这里的坑还有很多没填好，后续继续填坑
### 说一下 hash chunkhash contenthash
+ `hash` 是为了文件变动更新服务器的文件，消除浏览器的缓存，那为什么还要用`chunkhash,contenthash`
   - `chunkhash` 是利用缓存，文件没有改动不会变化，这样页面就会走缓存，所以这就需要我们把三方库抽离出来，这些一般是不会变的，这样可以利用chunkhash缓存起来，下次打包只要第三方库没有发生变化就不会重新生成一个chunkhash值，而是使用之前的，那既然chunkhash已经能优化到这个地方为什么还要用contenthash
   - `contenthash` 是进一步利用缓存，当我们有一个css文件，我们没有改动，但是我们的js文件改动了，这样打包的时候就会重新生成chunkhash,这样缓存就没法用了，但是css文件并没有变化，这时候contenthash就派上用场了，当我们的文件没有发生变化，其他的文件发生了变化我们的css文件也不会重新生成contenthash

### npm run dev 
+ 启动开发环境，此配置为多页面，如果新增页面入口，必须重启，

### npm run build
+ 打包上线环境，这里需要更多优化，后续持续填坑
