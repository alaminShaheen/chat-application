import enthusiastic from "assets/enthusiaistic.gif";
import mental_health from "assets/mental_health.gif";
import online_wishes from "assets/online_wishes.gif";
import refer_friends from "assets/refer_friends.gif";
import vision_board from "assets/vision_board.gif";
import { CommonUtils } from "Utils/CommonUtils";

const PREVIEW_IMAGES = [enthusiastic, mental_health, online_wishes, vision_board, refer_friends];

export const ImageShowcase = () => {
	return (
		<div className="w-auto">
			<img
				src={PREVIEW_IMAGES[CommonUtils.randomNumber(0, PREVIEW_IMAGES.length - 1)]}
				alt="image"
			/>
		</div>
	);
};
