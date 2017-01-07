const TARGET = process.env.npm_lifecycle_event;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const precss = require('precss');
const postcssImport = require('postcss-import');

var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

/* PASS THE TARGET ENVIRONMENT TO BABEL */
process.env.BABEL_ENV = TARGET;

const common = {

 entry: APP_PATH,

  resolve: {
        /* evalualetd from left to right so if a more specific match is 
        found further to the right (i.e. a .web.js extension) then that 
        is used instead of the default */
        /* Setting a '' flag allows us to refer to jsx files without 
        extension if wanted - but it is good to be explicit */
        extensions: ['', '.js']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: '/dist/',
  },
  module: {
     loaders: [
       { 
           test: /\.jsx?$/, 
           exclude: /node_modules/, 
           loader: "babel"
       },

       {
       test: /\.css$/,
        /* css loader deals with @imports and url statments in css
           and style loader deals with css require statements in js */
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader'),
        /* can also set up and exclude path */
        /* always set up an include as otherwise webpack will traverse all files
           in base directory
           Better to set up includes rather and excludes as you never know
           files will end up in the directory structure */
       }
      ],

      postcss: function () {
        return [precss, postcssImport({
                addDependencyTo: webpack
            })];
      }

    
  },


    plugins: [
      new ExtractTextPlugin('styles.css'),
    ],
};

if(TARGET === 'build') {
module.exports = merge(common, {

}
)
}

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    port: 1111,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only'
  },

        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
    )
}

if(TARGET === 'test' || TARGET === 'tdd') {
  module.exports = merge(common, {
    }
  );
}
