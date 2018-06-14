const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const reScript = /\.jsx?$/;
const reStyle = /\.(css|less|scss|sss)$/;

module.exports = env => {
  const config = {
    entry: [
      path.resolve(__dirname, 'src/index.js')
      // path.resolve(__dirname, 'src/scss/style.scss'),
    ],
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/bundle.js'
    },

    module: {
      rules: [
        // Rules for JS / JSX
        {
          test: reScript,
          include: path.resolve(__dirname, './src'),
          loader: 'babel-loader',
          options: {
            presets: ['stage-2', 'react']
          }
        },

        // Rules for Style Sheets
        {
          test: reStyle,
          rules: [
            // Convert CSS into JS module
            {
              issuer: { not: [reStyle] },
              use: 'isomorphic-style-loader'
            },

            // Process external/third-party styles
            {
              exclude: path.resolve(__dirname, './src'),
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true,
                discardComments: { removeAll: true }
              }
            },

            // Process internal/project styles (from src folder)
            {
              include: path.resolve(__dirname, './src'),
              loader: 'css-loader',
              options: {
                // CSS Loader https://github.com/webpack/css-loader
                importLoaders: 1,
                sourceMap: false,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: true,
                localIdentName: '[name]-[local]',
                // CSS Nano http://cssnano.co/options/
                minimize: true,
                discardComments: { removeAll: true }
              }
            },

            {
              test: /\.scss$/,
              loader: 'sass-loader'
            },

            {
              test: /\.json$/,
              exclude: /(node_modules)/,
              loader: 'json-loader'
            },

            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            }
          ]
        }
      ]
    },
    watch: env.NODE_ENV === 'development',
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/style.css',
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    resolve: {
      alias: {
        // Алиасы путей
        // ComponentsExpl: path.resolve(__dirname, 'src/js/components/exploitation'),
        Config: path.resolve(__dirname, 'etc')
      }
    }
  };
  const ssr = {
    entry: [
      path.resolve(__dirname, 'src/server/ssr/server.js')
      // path.resolve(__dirname, 'src/scss/style.scss'),
    ],
    output: {
      path: path.resolve(__dirname, 'dist/server'),
      filename: 'bundle.ssr.js',
      library: 'library',
      libraryTarget: 'umd'
    },
    target: 'node',

    module: {
      rules: [
        // Rules for JS / JSX
        {
          test: reScript,
          include: path.resolve(__dirname, './src'),
          loader: 'babel-loader',
          options: {
            presets: ['stage-2', 'react']
          }
        },
        {
          test: reStyle,
          rules: [
            // Convert CSS into JS module
            {
              issuer: { not: [reStyle] },
              use: 'isomorphic-style-loader'
            },

            // Process external/third-party styles
            {
              exclude: path.resolve(__dirname, './src'),
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true,
                discardComments: { removeAll: true }
              }
            },

            // Process internal/project styles (from src folder)
            {
              include: path.resolve(__dirname, './src'),
              loader: 'css-loader',
              options: {
                // CSS Loader https://github.com/webpack/css-loader
                importLoaders: 1,
                sourceMap: false,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: true,
                localIdentName: '[name]-[local]',
                // CSS Nano http://cssnano.co/options/
                minimize: true,
                discardComments: { removeAll: true }
              }
            },

            {
              test: /\.scss$/,
              loader: 'sass-loader'
            },

            {
              test: /\.json$/,
              exclude: /(node_modules)/,
              loader: 'json-loader'
            },

            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            }
          ]
        }
      ]
    },
    watch: env.NODE_ENV === 'development',
    plugins: [
      new ExtractTextPlugin({
        filename: path.resolve(__dirname, 'src/style.css'),
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    resolve: {
      alias: {
        // Алиасы путей
        // ComponentsExpl: path.resolve(__dirname, 'src/js/components/exploitation'),
        Config: path.resolve(__dirname, 'etc')
      }
    }
  };
  const client = {
    entry: [
      path.resolve(__dirname, 'src/server/ssr/index.js')
      // path.resolve(__dirname, 'src/scss/style.scss'),
    ],
    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: 'client.ssr.js'
    },
    target: 'node',

    module: {
      rules: [
        // Rules for JS / JSX
        {
          test: reScript,
          include: path.resolve(__dirname, './src'),
          loader: 'babel-loader',
          options: {
            presets: ['stage-2', 'react']
          }
        },
        {
          test: reStyle,
          rules: [
            // Convert CSS into JS module
            {
              issuer: { not: [reStyle] },
              use: 'isomorphic-style-loader'
            },

            // Process external/third-party styles
            {
              exclude: path.resolve(__dirname, './src'),
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true,
                discardComments: { removeAll: true }
              }
            },

            // Process internal/project styles (from src folder)
            {
              include: path.resolve(__dirname, './src'),
              loader: 'css-loader',
              options: {
                // CSS Loader https://github.com/webpack/css-loader
                importLoaders: 1,
                sourceMap: false,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: true,
                localIdentName: '[name]-[local]',
                // CSS Nano http://cssnano.co/options/
                minimize: true,
                discardComments: { removeAll: true }
              }
            },

            {
              test: /\.scss$/,
              loader: 'sass-loader'
            },

            {
              test: /\.json$/,
              exclude: /(node_modules)/,
              loader: 'json-loader'
            },

            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            }
          ]
        }
      ]
    },
    watch: env.NODE_ENV === 'development',
    plugins: [
      new ExtractTextPlugin({
        filename: path.resolve(__dirname, 'src/style.css'),
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    resolve: {
      alias: {
        // Алиасы путей
        // ComponentsExpl: path.resolve(__dirname, 'src/js/components/exploitation'),
        Config: path.resolve(__dirname, 'etc')
      }
    }
  };
  return [config, ssr, client];
};
