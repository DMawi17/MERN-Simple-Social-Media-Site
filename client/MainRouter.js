import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
    return (
        <div>
            {/* renders the first child that matches the requested route path. */}
            <Routes>
                <Route exact path="/" component={Home} />
            </Routes>
        </div>
    );
};

export default MainRouter;
