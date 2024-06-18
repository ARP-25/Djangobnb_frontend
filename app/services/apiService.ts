import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        try {
            console.log("get", url);
            const token = await getAccessToken();
            console.log("Retrieved Token:", token);

            if (!token) {
                throw new Error("Missing access token");
            }

            const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
            console.log("Request URL:", fullUrl);

            const response = await fetch(fullUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });

            console.log("Full response:", response);
            const json = await response.json();

            if (!response.ok) {
                return Promise.reject(json);
            }

            console.log("Response JSON:", json);
            return json;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    },

    post: async function (url: string, data: any): Promise<any> {
        console.log("post", url, data);

        const token = await getAccessToken();
        console.log("Retrieved Token:", token);

        if (!token) {
            throw new Error("Missing access token");
        }

        const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
        console.log("Request URL:", fullUrl);

        return fetch(fullUrl, {
            method: "POST",
            body: data, // Assuming data is an instance of FormData
            headers: {
                Authorization: `Bearer ${token}`, // Sending token for authentication
                // No need to set Content-Type when sending FormData
            },
            credentials: "include", // Ensure cookies are included
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((json) => {
                        return Promise.reject(json);
                    });
                }
                return response.json();
            })
            .then((json) => {
                console.log("Response:", json);
                return json;
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                throw error;
            });
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log("postWithoutToken", url, data);

        const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
        console.log("Request URL:", fullUrl);

        return fetch(fullUrl, {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include", // Ensure cookies are included
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((json) => {
                        return Promise.reject(json);
                    });
                }
                return response.json();
            })
            .then((json) => {
                console.log("Response:", json);
                return json;
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                throw error;
            });
    },
};

export default apiService;
