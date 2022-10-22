import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { Toast } from "components/Toast";
import { AppContextProvider } from "contexts/AppContext";
import React from "react";
import { Routes } from "Routes";

function App() {
	const location = new ReactLocation();
	return (
		<AppContextProvider>
			<Router location={location} routes={Routes}>
				<Outlet />
				<Toast />
			</Router>
		</AppContextProvider>
	);
}

export default App;
