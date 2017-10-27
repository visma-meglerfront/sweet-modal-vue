var path = require('path')
var merge = require('webpack-merge')

module.exports = merge.smart(require(path.resolve(__dirname, '../conf/webpack.js')), {
	entry: path.resolve(__dirname, './main.js'),

	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: path.resolve(__dirname, '../dist'),
		filename: 'sweet-modal.js',
		libraryTarget: 'umd',

		// These options are useful if the user wants to load the module with AMD
		library: 'sweet-modal',
		umdNamedDefine: true
		
	}
})