"use server";

import { cookies } from "next/headers";

export async function handleRefresh() {
    console.log("handleRefresh");

    const refreshToken = await getRefreshToken();
    console.log("Refresh Token", refreshToken);

    const token = await fetch("http://localhost:8000/api/auth/token/refresh/", {
        method: "POST",
        body: JSON.stringify({
            refresh: refreshToken,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(async (response) => {
            // Log the full response
            console.log("Full response:", response);

            // Check if the response is not ok (status code 2xx)
            if (!response.ok) {
                // Try to parse the response body for error details
                const errorText = await response.text();
                console.error("Error response body:", errorText);

                // Handle specific HTTP errors
                if (response.status === 401) {
                    console.error("Unauthorized - Invalid refresh token");
                } else if (response.status === 404) {
                    console.error("Endpoint not found");
                } else if (response.status === 400) {
                    console.error("Bad Request - Possibly invalid refresh token format or missing data");
                } else {
                    console.error("Server error");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            return response.json();
        })
        .then((json) => {
            console.log("Response - Refresh:", json);

            if (json.access) {
                cookies().set("session_access_token", json.access, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60, // 60 minutes
                    path: "/",
                });

                return json.access;
            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log("error", error);

            resetAuthCookies();
        });

    return token;
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    cookies().set("session_userId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, //One Week
        path: "/",
    });
    cookies().set("session_accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, //60 Minutes
        path: "/",
    });
    cookies().set("session_refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, //One Week
        path: "/",
    });
}

export async function resetAuthCookies() {
    console.log("Resetting cookies");
    cookies().set("session_userId", "");
    cookies().set("session_accessToken", "");
    cookies().set("session_refreshToken", "");
}

//
// Get Data
export async function getUserId() {
    const userId = cookies().get("session_userId")?.value;
    return userId ? userId : null;
}

//
//
export async function getAccessToken() {
    let accessToken = cookies().get("session_access_token")?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = cookies().get("session_refreshToken")?.value;
    console.log("Retrieved refresh token from cookies:", refreshToken);
    return refreshToken ? refreshToken : null;
}
