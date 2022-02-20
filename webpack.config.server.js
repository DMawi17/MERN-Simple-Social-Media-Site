const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

const nodeExternals = require("webpack-node-externals");
const config = {
    name: "server",
    entry: [path.join(CURRENT_WORKING_DIR, "./server/server.js")],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR, "/dist/"),
        filename: "server.generated.js", // run the server-side code using this.
        publicPath: "/dist/",
        libraryTarget: "commonjs2", // CommonJS environment will be assumed.
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
};

module.exports = config;
