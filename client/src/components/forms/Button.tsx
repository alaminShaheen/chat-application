import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export const Button = (props: ButtonProps) => {
	const { children, ...rest } = props;

	return (
		<button
			{...rest}
			className={`my-5 flex items-center justify-center w-full rounded-lg  font-black translate-y-2  ${
				rest.className ? rest.className : ""
			} h-12 px-5 py-2 border-2 border-black border-b-4 border-l-4 hover:bg-zinc-300`}
		>
			{children}
		</button>
	);
};
