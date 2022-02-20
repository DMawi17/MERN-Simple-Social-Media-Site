import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./../webpack.config.client.js";

// A compile method that takes the Express app and configures it.
const compile = (app) => {
    if (process.env.NODE_ENV == "development") {
        // Webpack middleware to compile and bundle.
        const compiler = webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
        });
        app.use(middleware); // serve code.
        app.use(webpackHotMiddleware(compiler)); // enable hot reloading.
    }
};

export default {
    compile, // call this compile method in server.js `devBundle.compile(app)`
};
