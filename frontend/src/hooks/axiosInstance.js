import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {

    let accessToken = localStorage.getItem(import.meta.env.VITE_ACCESSTOKEN_KEY);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    const startTime = new Date();
    config.metadata = { startTime: startTime }

    return config;
})

axiosInstance.interceptors.response.use((response) => {

    const endTime = new Date();
    response.durationMs = endTime - response.config.metadata.startTime;

    console.log(`${response.config.method.toUpperCase()} request to ${response.config.url} \n Received response in ${response.durationMs}ms`);
    return response;
}, async (error) => {
    const originalRequest = error.config;
    const isInvalid = error.response?.status === 401 || error.response?.status === 403

    if (error.response && isInvalid && !originalRequest._retry) {
        originalRequest._retry = true;

        let refreshToken = localStorage.getItem(import.meta.env.VITE_REFRESHTOKEN_KEY);

        if (refreshToken) {
            try {
                const response = await axios.post(`http://localhost:3000/api/auth/refresh`, { refreshToken: refreshToken });
                if (response.data) {
                    const { accessToken, refreshToken } = response.data;
                    localStorage.setItem(import.meta.env.VITE_ACCESSTOKEN_KEY, accessToken)
                    localStorage.setItem(import.meta.env.VITE_REFRESHTOKEN_KEY, refreshToken)
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                    return axiosInstance(originalRequest)
                }
            } catch (error) {
                localStorage.removeItem(import.meta.env.VITE_ACCESSTOKEN_KEY, null)
                localStorage.removeItem(import.meta.env.VITE_REFRESHTOKEN_KEY, null)
                return Promise.reject(error)
            }
        }
    }

    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             error.customMessage = "Please log in with valid credentials!";
    //             break;
    //         case 403:
    //             error.customMessage = "Invalid credentials!";
    //             break;
    //         case 404:
    //             error.customMessage = "The requested data was not found!";
    //             break;
    //         default:
    //             error.customMessage = "Oops! An internal server error occurred";
    //     }
    // } else {
    //     error.customMessage = 'Network error! Please check your connection.'
    // }

    return Promise.reject(error);
})

export default axiosInstance
