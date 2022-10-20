import { RegisterForm } from "components/authentication/RegisterForm";
import { ImageShowcase } from "components/ImageShowcase";
import { RegisterRequest } from "models/request/register-request";
import { useCallback } from "react";
import { AuthenticationService } from "services/authentication-service";

export const Register = () => {
	const onRegisterUser = useCallback((body: RegisterRequest) => {
		return AuthenticationService.register(body);
	}, []);

	return (
		<div className="flex w-screen h-screen items-center p-20">
			<section className="w-1/2 p-5 flex justify-center">
				<RegisterForm onRegisterUser={onRegisterUser} />
			</section>
			<section className="w-1/2">
				<ImageShowcase />
			</section>
		</div>
	);
};
