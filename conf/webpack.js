var path = require('path')
var webpack = require('webpack')
var MinifyPlugin = require('babel-minify-webpack-plugin')

// Determine which env to use
// by having it overriden at runtime using `cross-env NODE_ENV=...`
// Possible envs: dev, production
var node_env

if (process.env.NODE_ENV) {
	node_env = process.env.NODE_ENV.toLowerCase()
} else {
	node_env = 'production'
}

console.log('ENV', node_env)

module.exports = {
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
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
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['env', {
							targets: {
								browsers: ['last 2 versions', '>= 3%', 'not ie <= 10'],
								uglify: true
							},
							modules: false,
							forceAllTransforms: node_env === 'production'
						}]]
					}
				}
			},
			{
				test: /\.svg$/,
				use: 'svg-inline-loader?classPrefix'
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
				]
			}
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"' + node_env + '"'
			}
		})
	],

	devtool: '#cheap-source-map',

	devServer: {
		historyApiFallback: true,
		noInfo: true,
		port: 8081
	}
}

if (node_env == 'production') {
	module.exports.devtool = '#source-map'
	module.exports.plugins = module.exports.plugins.concat([
		new MinifyPlugin({}, {
			comments: false
		})
	])
}
