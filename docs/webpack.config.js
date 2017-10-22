var path = require('path')
var merge = require('webpack-merge')

module.exports = merge.smart(require(path.resolve(__dirname, '../conf/webpack.js')), {
	entry: path.resolve(__dirname, './main.js'),

	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: 'dist',
		filename: 'build.js'
	},

	devServer: {
		contentBase: path.resolve(__dirname)
	},

	devtool: '#inline-source-map',
	cache: true
})
