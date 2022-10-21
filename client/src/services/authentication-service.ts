import { axiosInstance } from "axiosInstance";
import { LoginRequest } from "models/request/login-request";
import { RegisterRequest } from "models/request/register-request";
import { UserAuthenticationResponse } from "models/response/user-authentication-response";
import { ServiceLinks } from "services/serviceLinks";

export class AuthenticationService {
	static register(body: RegisterRequest) {
		return axiosInstance.post<UserAuthenticationResponse>(ServiceLinks.register(), body);
	}

	static login(body: LoginRequest) {
		return axiosInstance.post<UserAuthenticationResponse>(ServiceLinks.login(), body);
	}
}
