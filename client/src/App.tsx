import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { AppContextProvider } from "contexts/AppContext";
import React from "react";
import { Routes } from "Routes";

function App() {
	const location = new ReactLocation();
	return (
		<AppContextProvider>
			<Router location={location} routes={Routes}>
				<Outlet />
			</Router>
		</AppContextProvider>
	);
}

export default App;
