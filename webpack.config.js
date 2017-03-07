var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: [
      './server.js',
    ],
    output: {
      path: './',
      filename: 'server.bundle.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    target: 'node',
    externals: [nodeExternals()]
  },
  {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
    //If you want to minify your files uncomment this
    // ,
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ]
  }
];
