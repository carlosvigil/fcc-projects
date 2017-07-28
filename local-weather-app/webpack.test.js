const path = require('path')

module.exports = {
  entry: './src/searchTest.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'testBundle.js'
  },
  devtool: 'source-map'
}

// ,
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['env']
//           }
//         }
//       }
//     ]
//   },
