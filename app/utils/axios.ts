import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//     function (config) {
//         console.log("Request:", config);
//         return config;
//     },
//     function (error) {
//         console.error("Request Error:", error);
//         return Promise.reject(error);
//     }
// );

// // Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        console.log("Response:", response);
        return response;
    },
    function (error) {
        // console.error("Response Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
