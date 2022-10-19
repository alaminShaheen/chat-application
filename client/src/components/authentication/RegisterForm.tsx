import { LabelledInputField } from "components/forms/LabelledInputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { DisplayFormError } from "Utils/DisplayFormError";

type FormValues = {
	username: string;
	password: string;
	confirmPassword: string;
};

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

	return (
		<form className="register-form-container w-3/5 px-14" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-center text-3xl text-gray-700 mb-6">Create an account</h2>
			<LabelledInputField
				{...register("username", {
					required: DisplayFormError.required("username"),
					minLength: 3 || DisplayFormError.minLength("username", 3),
				})}
				label="Username"
				type="text"
				id="username"
				placeholder="Enter a username"
				hasError={!!errors.username}
				errorMessage={errors.username?.message}
				icon={
					<HiOutlineUserCircle
						className="absolute top-3.5 left-3 text-gray-600"
						size={18}
					/>
				}
			/>

			<LabelledInputField
				{...register("password", {
					required: DisplayFormError.required("password"),
					minLength: 3 || DisplayFormError.minLength("password", 3),
				})}
				label="Password"
				type="password"
				id="password"
				placeholder="Enter a password"
				hasError={!!errors.password}
				errorMessage={errors.password?.message}
				icon={
					<RiLockPasswordLine
						className="absolute top-3.5 left-3 text-gray-600"
						size={18}
					/>
				}
			/>

			<LabelledInputField
				{...register("confirmPassword", {
					required: DisplayFormError.required("confirm password"),
					validate: (value) => {
						return watch("password") === value || DisplayFormError.match("password");
					},
				})}
				label="Confirm Password"
				type="password"
				id="confirmPassword"
				placeholder="Confirm password"
				hasError={!!errors.confirmPassword}
				errorMessage={errors.confirmPassword?.message}
				icon={
					<RiLockPasswordLine
						className="absolute top-3.5 left-3 text-gray-600"
						size={18}
					/>
				}
			/>
			<button className="font-semibold text-white bg-violet-600 w-full rounded h-10 my-5">
				Sign Up
			</button>
		</form>
	);
};
