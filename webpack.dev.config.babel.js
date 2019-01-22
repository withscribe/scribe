import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Stylish from 'webpack-stylish'

export default {
  devtool: 'cheap-module-source-map',
  // devtool: 'eval',
  mode: 'development',
  entry: {
    app: [
      // '@babel/polyfill',
      path.join(__dirname, 'src', 'index.js'),
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
    historyApiFallback: true,
    progress: true,
    stats: 'none',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      // inject: false,
      title: 'Scribe.',
      // favicon: path.join(__dirname, 'src', 'assets', 'img', 'favicon.ico'),
      template: path.join(__dirname, 'src', 'index.ejs'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new Stylish(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Components: path.join(__dirname, 'src/components'),
      Pages: path.join(__dirname, 'src/pages'),
      Styled: path.join(__dirname, 'src/styled'),
      System: path.join(__dirname, 'src/styled/system'),
      Queries: path.join(__dirname, 'src/queries'),
      Mutations: path.join(__dirname, 'src/mutations'),
      Stores: path.join(__dirname, 'src/stores'),
      Services: path.join(__dirname, 'src/services'),
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
        exclude: /node_modules/,
        use: ['file-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true,
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        exclude: /node_modules/,
        use: ['url-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
}
