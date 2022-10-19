import {
	forwardRef,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	ReactNode,
	useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	hasError?: boolean;
	errorMessage?: string;
	icon?: ReactNode;
};

export const LabelledInputField = forwardRef<HTMLInputElement, InputProps>(
	(props: InputProps, ref) => {
		const { label, hasError = true, errorMessage = "", className, icon, type, ...rest } = props;
		const [showPassword, setShowPassword] = useState(false);

		const generateInputFieldClassNames = () => {
			let classes = className ? className + " " : "";
			classes += (hasError ? "border-red-500" : "border-gray-300") + " ";
			classes += (hasError ? "focus:border-red-500" : "focus:border-teal-500") + " ";
			classes += (icon ? "pl-9" : "") + " ";
			classes += (type === "password" ? "pr-9" : "") + " ";
			return classes;
		};

		const renderPasswordVisibility = () => {
			if (showPassword) {
				return (
					<AiOutlineEyeInvisible
						className="absolute top-3.5 right-3 text-gray-600 cursor-pointer"
						onClick={() => setShowPassword((prev) => !prev)}
						size={18}
					/>
				);
			} else {
				return (
					<AiOutlineEye
						className="absolute top-3.5 right-3 text-gray-600 cursor-pointer"
						onClick={() => setShowPassword((prev) => !prev)}
						size={18}
					/>
				);
			}
		};

		const getInputType = (): HTMLInputTypeAttribute | undefined => {
			if (type === "password") {
				if (showPassword) {
					return "text";
				} else return "password";
			} else return type;
		};

		return (
			<div className="flex flex-col align-middle my-4">
				{label && (
					<label
						className="text-xl font-semibold text-gray-700 mt-2 mb-3"
						htmlFor={rest.name}
					>
						{label}
					</label>
				)}
				<div className="relative">
					<input
						{...rest}
						ref={ref}
						type={getInputType()}
						className={`border focus:border-2 outline-0 w-full rounded block h-11 p-3 ${generateInputFieldClassNames()}`}
					/>
					{icon && icon}
					{type === "password" && renderPasswordVisibility()}
				</div>
				{hasError && (
					<span className="text-red-500 text-sm mt-2 flex items-center">
						<BiErrorAlt className="inline mr-1" size={18} />
						{errorMessage}
					</span>
				)}
			</div>
		);
	},
);
