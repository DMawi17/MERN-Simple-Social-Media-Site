import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { hot } from "react-hot-loader";

const App = () => {
    return (
        // enables frontend routing with React Router
        <BrowserRouter>
            {/* gives it access to the Material-UI theme */}
            <ThemeProvider theme={theme}>
                <MainRouter />
            </ThemeProvider>
        </BrowserRouter>
    );
};

// enables live reloading of the React components during development
export default hot(module)(App);
