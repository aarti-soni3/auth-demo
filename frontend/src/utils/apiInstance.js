import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})


apiInstance.interceptors.request.use((config) => {

    const startTime = new Date();
    config.metadata = { startTime: startTime }

    // console.log(`${config.method.toUpperCase()} request to ${config.url}`);
    return config;
})

apiInstance.interceptors.response.use((response) => {

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