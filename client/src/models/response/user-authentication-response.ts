import { User } from "models/User";

export class UserAuthenticationResponse {
	constructor(public user: User, public accessToken: string) {}
}
