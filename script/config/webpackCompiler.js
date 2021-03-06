'use strict';

const chalk = require('chalk');
const clearConsole = require('./clearConsole');
const formatWebpackMessages = require('./formatWebpackMessages');
const clog = console.log;

// 用户的 shell
const isInteractive = process.stdout.isTTY;

// 打印异常
const showErrors = (messages) => {
  clog(chalk.bgRed('编译异常\n'));
  clog(messages.errors.join('\n\n'));
};

// 打印警告
const showWarning = (messages) => {
  clog(chalk.bgYellow('编译告警\n'));
  clog(messages.warnings.join('\n\n'));
};

const compilerOnDone = (stats) => {
  if (isInteractive) {
    clearConsole();
  }

  const messages = formatWebpackMessages(stats.toJson());

  !stats.hasErrors() && !stats.hasWarnings()
    ? clog(chalk.green('编译成功'))
    : stats.hasErrors()
    ? showErrors(messages)
    : showWarning(messages);
};

// 创建编译器
const creatCompiler = (webpack, webpackConfig) => {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (error) {
    clog(chalk.red('编译失败'));
    clog(err.message || err);
    process.exit(1);
  }

  // 编译中
  compiler.plugin('compile', function () {
    clog(chalk.blue('正在编译......'));
  });

  // 编译结束
  compiler.plugin('done', compilerOnDone);
  return compiler;
};

module.exports = creatCompiler;
