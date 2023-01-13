const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const { dev } = env;
  if (dev) {
    dotenv.config('./.local');
  } else {
    dotenv.config('./.env');
  }
  return {
    mode: dev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, process.env.DIR_PATH),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devServer: {
      static: path.join(__dirname, './dist'),
      port: 'auto',
      compress: true,
      proxy: {
        '^/api': {
          target: process.env.PROXY_TARGET,
          ws: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          node_vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'async',
            priority: 1,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify:
          process.env.NODE_ENV === 'production'
            ? {
                collapseWhitespace: true,
                removeComments: true,
              }
            : false,
      }),
      new webpack.EnvironmentPlugin(Object.keys(dotenv.parse || {})),
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg|wasm)$/,
        threshold: 8192,
        minRatio: 0.8,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true,
        statsOptions: { source: false },
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     // { from: "./src/textures", to: "./textures" },
      //     // { from: "./src/assets/index.css", to: "./index.css" },
      //     // { from: "./src/images", to: "./images" },
      //     // { from: "./src/models", to: "./models" },
      //     // { from: "./src/sounds", to: "./sounds" },
      //   ],
      // }),
    ],
  };
};
