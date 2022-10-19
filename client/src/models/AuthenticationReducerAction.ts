import { AuthenticationActionType } from "models/enums/AuthenticationActionType";
import { UserAuthentication } from "models/UserAuthentication";

export interface AuthenticationReducerAction {
	type: AuthenticationActionType;
	payload: UserAuthentication;
}
