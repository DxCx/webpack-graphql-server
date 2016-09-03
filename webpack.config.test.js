var failPlugin = require('webpack-fail-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var IstanbulPlugin = require('webpack-istanbul-plugin');

module.exports = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	devtool: 'inline-source-map',
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	module: {
		preLoaders: [{
			test: /\.ts$/,
			loaders: ['tslint']
		}],
		loaders: [{ test: /\.ts$/, loaders: ['awesome-typescript-loader?inlineSourceMap=true&sourceMap=false'] }],
	},
	plugins: [
		failPlugin,
		new IstanbulPlugin({
			test: /\.ts$/,
			include: [
				path.resolve('src'),
			],
			exclude: [
				path.resolve('node_modules'),
				/\.spec\.ts$/,
				/main\.test\.ts$/,
			],
		}),
	],
	tslint: {
		emitErrors: true,
		failOnHint: false,
	},
	resolve: {
		extensions: ['', '.ts', '.js'],
		modules: [
			'node_modules',
			'src',
		]
	},
};
