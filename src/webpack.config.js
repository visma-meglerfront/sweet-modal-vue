var path = require('path')
var merge = require('webpack-merge')


var configBrowser = {
	entry: path.resolve(__dirname, './plugin.js'),

	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: path.resolve(__dirname, '../dist'),
		filename: 'sweet-modal.min.js',
		library: "SweetModal",
		libraryTarget: 'window'
	}
};


var configAmd = {
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
};

module.exports = [
	merge.smart(require(path.resolve(__dirname, '../conf/webpack.js')), configAmd),
	merge.smart(require(path.resolve(__dirname, '../conf/webpack.js')), configBrowser),
];