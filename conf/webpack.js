const { resolve } = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// Determine which env to use
// by having it overriden at runtime using `cross-env NODE_ENV=...`
// Possible envs: development, production
var node_env

if (process.env.NODE_ENV) {
	node_env = process.env.NODE_ENV.toLowerCase()
} else {
	node_env = 'production'
}

console.log('ENV', node_env)

module.exports = {
	mode: node_env,

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
			'src': './src',
			'components': './src/components',
			'images': './src/images',
			'styles': './src/styles'
		},

		extensions: ['.js', '.vue']
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				],
				/*include: [
					resolve(__dirname, '../src'),
					resolve(__dirname, '../node_modules'),
				]*/
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', {
							targets: {
								browsers: ['last 2 versions', '>= 3%', 'not ie <= 10']
							},
							modules: false
						}]]
					}
				},
				include: [
					resolve(__dirname, '../node_modules')
				]
			},
			{
				test: /\.svg$/,
				use: 'svg-inline-loader?classPrefix',
				include: [
					resolve(__dirname, '../src')
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						query: {
							name: '[name].[ext]?[hash]'
						}
					}
				],
				include: [
					resolve(__dirname, '../src')
				]
			}
		],
	},

	devtool: '#cheap-source-map',

	plugins: [
		new VueLoaderPlugin()
	],

	devServer: {
		historyApiFallback: true,
		noInfo: true,
		port: 8081
	}
}

if (node_env == 'production') {
	module.exports.devtool = '#source-map'
}
