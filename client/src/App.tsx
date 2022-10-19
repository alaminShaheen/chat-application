import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import React from "react";
import { Routes } from "Routes";

function App() {
	const location = new ReactLocation();
	return (
		<div className="">
			<Router location={location} routes={Routes}>
				<Outlet />
			</Router>
		</div>
	);
}

export default App
