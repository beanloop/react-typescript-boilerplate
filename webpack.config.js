'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

const babelPlugins = ['jsx-tagclass']
const babelDevPlugins = babelPlugins
  .map(plugin => require.resolve(`babel-plugin-${plugin}`))
const babelProdPlugins = babelPlugins
  .concat([
    'transform-react-constant-elements',
    'transform-react-inline-elements',
  ])
  .map(plugin => require.resolve(`babel-plugin-${plugin}`))

const browserConfig = {
  name: 'browser',
  entry: {
    javascript: [
      'babel-polyfill',
      './app/index',
    ],
  },
  output: {
    publicPath: '/',
    path: './dist',
    filename: production ? 'app.[hash].js' : 'app.js',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },
  debug: !production,
  devtool: production ? 'none' : 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel?' + JSON.stringify({
            presets: [
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-2'),
            ],
            plugins: production
              ? babelProdPlugins
              : babelDevPlugins,
          }),
         'ts',
       ],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.scss'],
    modulesDirectories: ['node_modules', path.resolve('./node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      __ROOT_PATH__: `"${__dirname}"`,
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
    }),
  ],
  postcss: webpack => ({
    plugins: [
      require('postcss-easy-import')({
        addDependencyTo: webpack,
        path: ['node_modules/*.scss', path.resolve('./node_modules'), ''],
        extensions: ['.scss', '.css'],
      }),
      require('postcss-strip-inline-comments'),
      require('precss')({import: {disable: true}}),
      require('postcss-calc'),
      require('autoprefixer'),
    ],
    syntax: require('postcss-scss'),
  }),
}

if (production) {
  const webpack = require('webpack')

  browserConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      test: /\.js$/,
    }),
  ]
}

module.exports = browserConfig
