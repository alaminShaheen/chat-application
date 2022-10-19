import { RegisterForm } from "components/authentication/RegisterForm";
import { ImageShowcase } from "components/ImageShowcase";

export const Register = () => {
	return (
		<div className="flex w-screen h-screen items-center p-20">
			<section className="w-7/12 p-12 flex justify-center align-middle">
				<RegisterForm />
			</section>
			<section className="w-5/12">
				<ImageShowcase />
			</section>
		</div>
	);
};
