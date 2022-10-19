import { User } from "models/User";

export type UserAuthentication = {
	user: User;
	isAuthenticated: boolean;
};
