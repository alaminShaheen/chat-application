import { MouseEventHandler } from "react";
import UseAnimations from "react-useanimations";
import { Animation } from "react-useanimations/utils";

type AnimatedIconsProps = {
	animation: Animation;
	reverse: boolean;
	onClick: MouseEventHandler<HTMLDivElement>;
	size: number;
};

export const AnimatedIcons = (props: AnimatedIconsProps) => {
	return <UseAnimations {...props} />;
};
