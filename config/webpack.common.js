const paths = require('./paths')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files

module.exports = {
	entry: [paths.src + '/index.tsx'],
	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),

		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public + '/assets',
					to: 'assets',
					globOptions: {
						ignore: ['*.DS_Store'],
					},
					noErrorOnMissing: true,
				},
			],
		}),

		new HtmlWebpackPlugin({
			template: paths.public + '/index.html',
			filename: 'index.html',
		}),
	],
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.(ts|tsx)$/, exclude: /node_modules/, use: ['babel-loader'] },

			// Styles: Inject CSS into the head with source maps
			// Note from OK -> nuked minicssextact fro dev.. instead use style-loader
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},

			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},

			// Images: Copy image files to build folder
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
		],
	},
}
