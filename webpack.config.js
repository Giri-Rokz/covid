const path = require('path');
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
//const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const terserPlugin = require('terser-webpack-plugin');
//const ImageminPlugin = require('imagemin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	//mode: 'development',
	entry: {
		script: './script.js',
		style: "./style.scss"
	},
	output: {
	  filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: 'dist/',
      path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
		  {test: /\.s[ac]ss$/i,
		   use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
		  }
		]
	  },
	/*optimization: {
	  minimizer: [new optimizeCssPlugin(),new terserPlugin()
	  ]
	},*/
	plugins: [
	new MiniCssExtractPlugin({filename: "[name].css"}),
    new FixStyleOnlyEntriesPlugin(),
	new optimizeCssPlugin({}),
	new terserPlugin(),
	new CopyWebpackPlugin([{
		from: 'img/**/**',
    	to: path.resolve(__dirname, 'dist')
    }]),
    new ImageminPlugin({
      pngquant: ({quality: [1,1]}),
	  })
	/*new htmlPlugin({
		template: './index.html',
		minify: {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
			removeComments: true
		  } 	
	  })*/]
}