const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const eslintFomatter = require('./config/eslintFomatter');

const basicConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
    modules: ['node_modules', resolve(__dirname, '../src')],
  },
  plugins: [
    // 它会用新生成的index.html
    new HtmlWebpackPlugin({
      title: '',
      template: 'public/index.html', // 首页模板
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: eslintFomatter,
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: 'img/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
};

module.exports = basicConfig;
