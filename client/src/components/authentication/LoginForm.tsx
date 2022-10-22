import { Link, useNavigate } from "@tanstack/react-location";
import { AxiosError, AxiosResponse } from "axios";
import { LabelledInputField } from "components/forms/LabelledInputField";
import { Toast } from "components/Toast";
import { useAppContext } from "contexts/AppContext";
import { LoginRequest } from "models/request/login-request";
import { UserAuthenticationResponse } from "models/response/user-authentication-response";
import { ValidationErrors } from "models/ValidationErrors";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "RoutePaths";
import { DisplayFormError } from "Utils/DisplayFormError";

type FormValues = {
	username: string;
	password: string;
};

type LoginFormProps = {
	onUserLogin: (body: LoginRequest) => Promise<AxiosResponse<UserAuthenticationResponse>>;
};

export const LoginForm = (props: LoginFormProps) => {
	const { onUserLogin } = props;
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormValues>();
	const { authenticateUser } = useAppContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<FormValues> = async (formData) => {
		try {
			setIsLoading(true);
			const { data } = await onUserLogin(formData);
			authenticateUser(data);
			navigate({ to: RoutePaths.PROTECTED_ROUTES });
		} catch (error: any) {
			if (error instanceof AxiosError) {
				const validationErrors = error.response?.data as ValidationErrors;

				if (validationErrors) {
					if (Array.isArray(validationErrors.message)) {
						validationErrors.message.forEach((validationError) => {
							Object.values(validationError.constraints).forEach((message) => {
								setError(validationError.property as keyof FormValues, { message });
							});
						});
					} else {
						toast.error(validationErrors.message);
					}
				} else {
					toast.error(error.message);
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="login-form-container w-[24rem] px-5" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-center text-3xl text-gray-700 mb-6 pb-2">Login</h2>
			<LabelledInputField
				{...register("username", {
					required: { value: true, message: DisplayFormError.required("username") },
					minLength: {
						value: 3,
						message: DisplayFormError.minLength("username", 3),
					},
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
					required: {
						value: true,
						message: DisplayFormError.required("password"),
					},
					minLength: {
						value: 3,
						message: DisplayFormError.minLength("password", 3),
					},
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
			<button
				className={`font-semibold relative flex justify-center items-center text-white bg-teal-600 ${
					isLoading ? "bg-opacity-70" : ""
				} w-full rounded h-10 mt-5 mb-3`}
				disabled={isLoading}
				type="submit"
			>
				{isLoading ? (
					<AiOutlineLoading3Quarters
						className="animate-spin delay-500 absolute left-1/2 font-bold"
						size={17}
					/>
				) : (
					<span>Sign In</span>
				)}
			</button>
			<div className="text-gray-500 text-sm font-semibold">
				Don&apos;t have an account?
				<Link
					className="ml-2 text-teal-600 hover:text-teal-800 font-semibold cursor-pointer"
					to={RoutePaths.REGISTER}
					activeOptions={{ exact: true }}
				>
					Sign Up
				</Link>
			</div>
			<Toast />
		</form>
	);
};
