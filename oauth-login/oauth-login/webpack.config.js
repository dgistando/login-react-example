const uglify = require('uglifyjs-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
    mode : 'development',
    entry: ['babel-polyfill','./src/index.js'],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env','react']
              }
            }
          },
          {
            test:/\.css$/,
            use:['style-loader','css-loader']
          },

        ]
      },
    plugins : [//handles code post download 
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './public/'
    }
}