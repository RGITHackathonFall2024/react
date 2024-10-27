import axios, { Axios } from "axios";

export const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-type": "application/json",
		Accept: "application/json"
	},
	validateStatus: (status) => status >= 200 && status < 300
});