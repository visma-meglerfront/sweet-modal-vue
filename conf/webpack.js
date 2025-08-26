var path = require('path')
var webpack = require('webpack')

// Determine which env to use
// by having it overriden at runtime using `cross-env NODE_ENV=...`
// Possible envs: dev, production
var node_env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'production';

console.log('ENV', node_env)

module.exports = {
	mode: node_env === 'production' ? 'production' : 'development',

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
								browsers: ['last 2 versions', '>= 3%', 'not ie <= 10']
							},
							modules: false,
							forceAllTransforms: node_env === 'production'
						}]]
					}
				}
			},
			{
				test: /\.svg$/,
				use: [
				  {
					loader: 'svg-inline-loader',
					options: {
					  classPrefix: true
					}
				  }
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
					}
				]
			}
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(node_env)
		})
	],

	devServer: {
		historyApiFallback: true,
		noInfo: true,
		port: 8081
	}
}
