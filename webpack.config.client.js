const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: "browser",
    mode: "development", // sets process.env.NODE_ENV to dev (default to prod)
    devtool: "eval-source-map", // compressed file back to its original position in a source file to aid debugging.
    entry: [
        // starts bundling, with the main.js file in the client folder.
        "webpack-hot-middleware/client?reload=true",
        path.join(CURRENT_WORKING_DIR, "client/main.js"),
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, "/dist"),
        filename: "bundle.js", // client-side code will be loaded from here.
        publicPath: "/dist/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // sets the regex rule for file extension.
                exclude: /node_modules/, // folders to exclude.
                use: ["babel-loader"], // transpilation tool to be used.
            },
            {
                // bundles the static image file with the rest of the compiled JS code so that the code can access and load it.
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        //  enables hot module replacement for react-hot-loader.
        new webpack.HotModuleReplacementPlugin(),
        // allows skipping emitting when there are compile errors.
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        alias: {
            // point react-dom references to the @hot-loader/react-dom version.
            "react-dom": "@hot-loader/react-dom",
        },
    },
};

module.exports = config;
