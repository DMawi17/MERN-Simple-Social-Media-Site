import React from "react";
import { hot } from "react-hot-loader";

const HelloWorld = () => {
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    );
};

// hot-exported to enable hot reloading with react-hot-loader during dev.
export default hot(module)(HelloWorld);
