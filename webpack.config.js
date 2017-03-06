var path = require('path');

var publicDir = path.join(__dirname, 'public');
var srcDir = path.join(__dirname, 'src');

module.exports = {
  entry: [
    srcDir + '/index.js',
  ],
  output: {
    path: publicDir,
    publicPath: publicDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
