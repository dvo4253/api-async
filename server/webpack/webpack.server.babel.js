import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const fileRoot = process.cwd();

const serverPack = {
  mode: 'development',
  stats: 'minimal',
  target: 'node',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(fileRoot, '/dist/server'),
    filename: 'index.js'
  },
  externals: [nodeExternals()], // do not attempt to bundle node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(fileRoot, 'dist/server')], {
      root: path.join(__dirname, '../'),
      verbose: false
    }),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ]
};

module.exports = serverPack;
