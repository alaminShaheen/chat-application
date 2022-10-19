import { axiosInstance } from "axiosInstance";
import { AuthenticationActionType } from "models/enums/AuthenticationActionType";
import { UserAuthenticationResponse } from "models/response/user-authentication-response";
import { User } from "models/User";
import { UserAuthentication } from "models/UserAuthentication";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { AuthenticationReducer } from "reducers/AuthenticationReducer";
import { ServiceLinks } from "services/serviceLinks";

type AppContext = {
	authenticateUser: (data: UserAuthenticationResponse) => void;
	unAuthenticateUser: () => void;
	userAuthenticationData: UserAuthentication;
	isRefreshingToken: boolean;
};

const defaultAppContext: AppContext = {
	userAuthenticationData: { isAuthenticated: false, user: User.EMPTY },
	authenticateUser: () => null,
	unAuthenticateUser: () => null,
	isRefreshingToken: false,
};

const context = createContext<AppContext>(defaultAppContext);

type AppContextProps = {
	children: ReactNode;
};

export const useAppContext = () => {
	return useContext<AppContext>(context);
};

export const AppContextProvider = ({ children }: AppContextProps) => {
	const [isRefreshingToken, setIsRefreshingToken] = useState(false);
	const [userAuthenticationData, userAuthenticationActions] = useReducer(AuthenticationReducer, {
		isAuthenticated: false,
		user: User.EMPTY,
	});

	const authenticateUser = useCallback((data: UserAuthenticationResponse) => {
		userAuthenticationActions({
			type: AuthenticationActionType.AUTHENTICATE,
			payload: { user: data.user, isAuthenticated: true },
		});
		axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
	}, []);

	const unAuthenticateUser = useCallback(() => {
		userAuthenticationActions({
			type: AuthenticationActionType.UNAUTHENTICATE,
			payload: { user: User.EMPTY, isAuthenticated: false },
		});
	}, []);

	const reAuthenticate = useCallback(async () => {
		try {
			setIsRefreshingToken(true);
			const { data } = await axiosInstance.get(ServiceLinks.refreshToken(), {
				withCredentials: true,
			});
			authenticateUser(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsRefreshingToken(false);
		}
	}, [authenticateUser]);

	useEffect(() => {
		void reAuthenticate();
	}, [reAuthenticate]);

	return (
		<context.Provider
			value={{
				authenticateUser,
				userAuthenticationData,
				unAuthenticateUser,
				isRefreshingToken,
			}}
		>
			{children}
		</context.Provider>
	);
};
