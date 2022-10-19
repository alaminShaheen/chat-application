import axios, { AxiosInstance } from "axios";
import { AppConstants } from "constants/appConstants";

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: AppConstants.apiBaseUrl,
	headers: {
		Accept: "application/json",
	},
	withCredentials: true,
});
