const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const chalk = require('chalk');
const { resolve } = require('path');
const basicConfig = require('./basic');
const clog = console.log;

const webpackConfig = webpackMerge(basicConfig, {
  // 入口
  entry: {
    index: ['babel-polyfill', './src/index.js'],
    react: ['react', 'react-dom', 'react-router-dom'],
  },
  // 出口
  output: {
    path: resolve(__dirname, '../build'), // 导出文件位置
    filename: 'js/[name].[chunkhash:8].js', // 编译文件名称
    chunkFilename: 'js/async-[id]-[name].[chunkhash:8].js', // 异步加载模块名称
    publicPath: '/', // 生成的打包文件引入 index.html 时会添加前缀。
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  devtool: 'source-map',
  plugins: [
    // 复制静态资源到打包目录
    // new CopyWebpackPlugin([{ from: 'public', ignore: ['index.html'] }], {
    //   copyUnmodified: true
    // }),
    // 清理dist文件夹
    new CleanWebpackPlugin(['build'], {
      root: resolve(__dirname, '../'),
      verbose: false,
    }),
    // 精简输出
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: { beautify: false },
        compress: { warnings: false },
      },
    }),
    // 一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    // 插件可以将公共的依赖模块提取到已有的入口模块中，或者提取到一个新生成的模块。
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ["react", "common"],
    //   filename: "js/[name].[chunkhash:8].js",
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   children: true,
    //   async: "common",
    // }),
    // CSS隔离
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
  // 加载依赖模块
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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

const compiler = webpack(webpackConfig);

compiler.plugin('compile', function () {
  clog(chalk.blue('正在编译......'));
});

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    clog(chalk.red('编译失败'));
    throw new Error(err);
  }

  clog(chalk.green('编译成功'));
  clog(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })
  );
});
