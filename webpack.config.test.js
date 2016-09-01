var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	module: {
		preLoaders: [{ test: /\.ts$/, loaders: ['tslint'] }],
		loaders: [{ test: /\.ts$/, loaders: ['ts-loader'] }]
	},
	tslint: {
		emitErrors: true,
		failOnHint: false,
	},
	ts: {
		compiler: 'typescript',
		configFileName: 'tsconfig.json',
		compilerOptions: {
			inlineSourceMap: true,
			sourceMap: false,
		},
	},
	resolve: {
		extensions: ['', '.ts', '.js'],
		modules: [
			'node_modules'
		]
	},
};
