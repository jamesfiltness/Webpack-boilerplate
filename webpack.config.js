module.exports = {
    entry: "./app/index.js",
    resolve: {
        /* evalualetd from left to right so if a more specific match is 
        found further to the right (i.e. a .web.js extension) then that 
        is used instead of the default */
        /* Setting a '' flag allows us to refer to jsx files without 
        extension if wanted - but it is good to be explicit */
        extensions: ['', '.js', '.jsx']
  },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
   module: {
     loaders: [
       { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"}
    ]
  },
  devServer: {
      historyApiFallback: true,
      port: 1111
  }
};