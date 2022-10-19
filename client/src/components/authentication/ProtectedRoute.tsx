import { Navigate } from "@tanstack/react-location";
import { useAppContext } from "contexts/AppContext";
import { RoutePaths } from "RoutePaths";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const {
		userAuthenticationData: { isAuthenticated },
		isRefreshingToken,
	} = useAppContext();
	console.log({ isAuthenticated });

	if (isRefreshingToken) {
		return <div>Loading...</div>;
	} else return isAuthenticated && children ? children : <Navigate to={RoutePaths.LOGIN} />;
};
