const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT;
const mode = process.env.NODE_ENV;

module.exports = {
	mode,
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, './build'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	cache: {
		type: 'filesystem',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', '@babel/react'],
					},
				},
			},
			{
				test: /.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Title',
			template: './client/index.html',
		}),
	],
	devtool: 'eval-source-map',
	devServer: {
		static: {
			publicPath: '/',
			directory: path.join(__dirname, 'build'),
		},
		historyApiFallback: true,
		hot: true,
		proxy: {
			'/transversal': 'http://localhost:3000',
			'/graphql': 'http://localhost:3000',
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
