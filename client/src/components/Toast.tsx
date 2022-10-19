import { ToastContainer } from "react-toastify";

export const Toast = () => {
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
		/>
	);
};
