import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";

const MainRouter = () => {
	return (
		<div>
			{/* renders the first child that matches the requested route path. */}
			<Routes>
				{/* <Route exact path="/" component={Home} /> */}
				<Route path="/" exact element={<Home />} />
				<Route path="/users" element={<Users />} />
			</Routes>
		</div>
	);
};

export default MainRouter;
