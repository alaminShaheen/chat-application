import {
	forwardRef,
	Fragment,
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
			classes += (hasError ? "border-red-500" : "border-black") + " ";
			return classes;
		};

		const renderPasswordVisibility = () => {
			if (showPassword) {
				return (
					<span className="absolute top-1/2 -translate-y-1/2 right-3">
						<AiOutlineEyeInvisible
							className="text-gray-600 cursor-pointer"
							onClick={() => setShowPassword((prev) => !prev)}
							size={18}
						/>
					</span>
				);
			} else {
				return (
					<span className="absolute top-1/2 -translate-y-1/2 right-3">
						<AiOutlineEye
							className="text-gray-600 cursor-pointer"
							onClick={() => setShowPassword((prev) => !prev)}
							size={18}
						/>
					</span>
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
			<Fragment>
				<label
					className={`relative block p-3 border-2 rounded my-4 ${generateInputFieldClassNames()}`}
					htmlFor="name"
				>
					{icon && <span className="mr-6">{icon}</span>}
					<span className="text-md font-semibold text-zinc-900">{label}</span>
					{type === "password" && renderPasswordVisibility()}
					<input
						{...rest}
						ref={ref}
						className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
						type={getInputType()}
					/>
				</label>
				{hasError && (
					<span className="text-red-500 text-sm block flex items-center pb-2">
						<BiErrorAlt className="inline mr-1" size={18} />
						{errorMessage}
					</span>
				)}
			</Fragment>
		);
	},
);
