const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.js',
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
	},
	module: {
    rules: [
      {
        exclude: [
          /node_modules/,
        ],
        include: path.resolve(__dirname, 'app'),
        test: /\.css$/,
        use: [
					'style-loader',
					'css-loader'
				],
      },
      {
        exclude: [
          /node_modules/,
        ],
        include: path.resolve(__dirname, 'app'),
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true
  },
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
}