var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

/* helper function to get into build directory */
var distPath = function(name) {
	if ( undefined === name ) {
		return path.join('dist');
	}

	return path.join('dist', name);
}

var webpack_opts = {
	entry: './src/main.ts',
	target: 'node',
	output: {
		filename: distPath('main.js'),
		libraryTarget: "commonjs2"
	},
	resolve: {
		extensions: ['', '.ts', '.js'],
		modules: [
			'node_modules',
			'src',
		]
	},
	plugins: [],
	module: {
		preLoaders: [{ test: /\.ts$/, loader: 'tslint' }],
		loaders: [{ test: /\.ts$/, loaders: ['awesome-typescript-loader'] }]
	},
	externals: [nodeExternals()],
	tslint: {
		emitErrors: true,
		failOnHint: true
	},
	ts: {
		compiler: 'typescript',
		configFileName: 'tsconfig.json'
	}
}

module.exports = webpack_opts;
