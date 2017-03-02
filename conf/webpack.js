var path = require('path')
var webpack = require('webpack')

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
	resolveLoader: {
		root: path.join(__dirname, 'node_modules'),
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
		},

		extensions: ['', '.js', '.vue']
	},

	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline?classPrefix'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file',
				query: {
					name: '[name].[ext]?[hash]'
				}
			}
		],
	},

	vue: {
		loaders: {
			scss: 'vue-style!css!sass'
		}
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
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = module.exports.plugins.concat([
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	])
}
