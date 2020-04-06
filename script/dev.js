const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackDevServer = require('webpack-dev-server');
const { resolve } = require('path');
const chalk = require('chalk');
const basicConfig = require('./basic');
const creatCompiler = require('./config/webpackCompiler');
const proxy = require('./proxy');

const clog = console.log;

const webpackConfig = webpackMerge(basicConfig, {
  // 入口
  entry: {
    index: [
      'babel-polyfill',
      'webpack-dev-server/client?http://0.0.0.0:3000/',
      'webpack/hot/dev-server',
      './src/index.js',
    ],
  },
  // 出口
  output: {
    path: resolve(__dirname, '../dev'), // 导出文件位置
    filename: '[name].bundle.js', // 编译文件名称
    chunkFilename: 'async-[name].js', // 异步加载模块名称
    publicPath: '/', // 生成的打包文件引入 index.html 时会添加前缀。
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // 插件可以将公共的依赖模块提取到已有的入口模块中，或者提取到一个新生成的模块。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "common", // 指定公共 bundle 的名称。
    //   minChunks: Infinity,
    // }),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
    ],
  },
});

const compiler = creatCompiler(webpack, webpackConfig);

const devServer = new webpackDevServer(compiler, {
  // contentBase: resolve(__dirname, 'dev'), // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
  publicPath: '/', // 此路径下的打包文件可在浏览器中访问
  host: '0.0.0.0', // 指定使用一个 host
  port: 3000, // 监听端口
  hot: true, // 启用 webpack 的模块热替换特性
  overlay: false, // 当出现编译错误或警告时，在浏览器中显示一个全屏覆盖。
  compress: true, // 一切服务都启用 gzip 压缩
  quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  // stats: {
  //   colors: true,
  //   modules: false,
  //   children: false,
  //   chunks: false,
  //   chunkModules: false
  // },
  proxy,
  historyApiFallback: { disableDotRule: true },
});

devServer.listen(3000, '0.0.0.0', () => {
  clog(chalk.blue('浏览器运行 127.0.0.1:3000'));
});
