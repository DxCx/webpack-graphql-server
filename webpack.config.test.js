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
		loaders: [{ test: /\.ts$/, loaders: ['ts-loader'] }],
	},
	plugins: [
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
			'node_modules',
			'src',
		]
	},
};
