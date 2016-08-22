var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

/* small hack to build map of node modules used for excluding from webpack */
var nodeModules = {};
fs.readdirSync('node_modules').filter(function (x) {
	return ['.bin'].indexOf(x) === -1;
}).forEach(function (mod) {
	nodeModules[mod] = 'commonjs ' + mod;
});

/* helper function to get into build directory */
var distPath = function(name) {
	if ( undefined === name ) {
		return path.join(__dirname, 'dist');
	}

	return path.join(__dirname, 'dist', name);
}

var webpack_opts = {
	entry: './src/main.ts',
	target: 'node',
	output: {
		filename: distPath('main.js'),
		libraryTarget: "commonjs2"
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	module: {
		preLoaders: [{ test: /\.ts$/, loader: 'tslint' }],
		loaders: [{ test: /\.ts$/, loader: 'ts-loader' }]
	},
	externals: nodeModules,
	plugins: [
		new webpack.IgnorePlugin(/\.(css|less)$/),
	],
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
