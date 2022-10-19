import { AuthenticationReducerAction } from "models/AuthenticationReducerAction";
import { AuthenticationActionType } from "models/enums/AuthenticationActionType";
import { User } from "models/User";
import { UserAuthentication } from "models/UserAuthentication";

export const AuthenticationReducer = (
	state: UserAuthentication,
	action: AuthenticationReducerAction,
) => {
	const { type, payload } = action;

	switch (type) {
		case AuthenticationActionType.AUTHENTICATE:
			return {
				...payload,
				isAuthenticated: true,
			};
		case AuthenticationActionType.UNAUTHENTICATE:
			return {
				user: User.EMPTY,
				isAuthenticated: false,
			};
	}
};
