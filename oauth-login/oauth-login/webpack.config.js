const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
    mode : 'production',
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
        new uglify()
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './public/'
    }
}