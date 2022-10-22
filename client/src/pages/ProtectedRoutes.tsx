import { Navigate, Outlet } from "@tanstack/react-location";
import { SideNavbar } from "components/SideNavbar";
import { useAppContext } from "contexts/AppContext";
import { RoutePaths } from "RoutePaths";
import { AuthenticationService } from "services/authentication-service";

export const ProtectedRoutes = () => {
	const {
		userAuthenticationData: { isAuthenticated },
		isRefreshingToken,
	} = useAppContext();

	const onLogout = () => {
		return AuthenticationService.logout();
	};

	if (isRefreshingToken) {
		return <div>Loading...</div>;
	} else
		return isAuthenticated ? (
			<div className="flex h-screen" style={{ backgroundColor: "#f4f4f0" }}>
				<SideNavbar onLogout={onLogout} />
				<Outlet />
			</div>
		) : (
			<Navigate to={RoutePaths.LOGIN} />
		);
};
