import { LoginForm } from "components/authentication/LoginForm";
import { ImageShowcase } from "components/ImageShowcase";
import { LoginRequest } from "models/request/login-request";
import { useCallback } from "react";
import { AuthenticationService } from "services/authentication-service";

export const Login = () => {
	const onUserLogin = useCallback((body: LoginRequest) => {
		return AuthenticationService.login(body);
	}, []);

	return (
		<div className="flex flex-row-reverse w-screen h-screen items-center p-20">
			<section className="w-1/2 p-5 flex justify-center">
				<LoginForm onUserLogin={onUserLogin} />
			</section>
			<section className="w-1/2 flex justify-center">
				<ImageShowcase />
			</section>
		</div>
	);
};
