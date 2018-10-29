import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default {
  entry: {
    app: [
      // '@babel/polyfill',
      path.join(__dirname, 'src', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      // test: new RegExp('\\.(js|css)$'),
      test: /\.js(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      title: 'Scribe.',
      // favicon: path.join(__dirname, 'assets', 'img', 'favicon.ico'),
      template: path.join(__dirname, 'src', 'index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new BundleAnalyzerPlugin(),
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
      _system: path.join(__dirname, 'src/styled/_system'),
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
        use: ['file-loader', {
          loader: 'image-webpack-loader',
          options: {
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
        ],
        include: path.join(__dirname, 'src'),
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif)$/i,
      //   use: ['file-loader'],
      //   include: path.join(__dirname, 'src'),
      // },
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
        use: ['url-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
}
