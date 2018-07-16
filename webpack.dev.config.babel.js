import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      './src/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './src/',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'webpack4 Boiler',
      favicon: path.join(__dirname, 'src', 'assets', 'img', 'favicon.ico'),
      template: path.join(__dirname, 'src', 'index.ejs'),
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Components: path.join(__dirname, 'src/components'),
      Presentational: path.join(__dirname, 'src/presentational'),
      Styles: path.join(__dirname, 'src/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: ['file-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: ['raw-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
}
