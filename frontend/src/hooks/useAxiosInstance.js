import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export const useAxiosInstance = () => {
    const [token,] = useLocalStorage(import.meta.env.VITE_TOKEN_KEY, null);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    axiosInstance.interceptors.request.use((config) => {

        if (token)
            config.headers.Authorization = `Bearer ${token}`

        const startTime = new Date();
        config.metadata = { startTime: startTime }

        return config;
    })

    axiosInstance.interceptors.response.use((response) => {

        const endTime = new Date();
        response.durationMs = endTime - response.config.metadata.startTime;

        console.log(`${response.config.method.toUpperCase()} request to ${response.config.url} \n Received response in ${response.durationMs}ms`);
        return response;
    }, (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    error.customMessage = "Please log in with valid credentials!";
                    break;
                case 403:
                    error.customMessage = "Invalid credentials!";
                    break;
                case 404:
                    error.customMessage = "The requested data was not found!";
                    break;
                default:
                    error.customMessage = "Oops! An internal server error occurred";

            }
        } else {
            error.customMessage = 'Network error! Please check your connection.'
        }

        return Promise.reject(error);
    })

    return axiosInstance;
}


