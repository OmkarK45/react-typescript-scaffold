const paths = require('./paths')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),

	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [new TsconfigPathsPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},

			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
			{ test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
		],
	},

	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		publicPath: '/',
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
}
