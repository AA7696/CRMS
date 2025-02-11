import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Install using `npm install jwt-decode`

export const checkTokenValidity = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
        console.log("No tokens found. Please log in.");
        return null;
    }

    // Decode the access token to check its expiration
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decodedToken.exp > currentTime) {
        // Token is still valid
        console.log("Access token is valid.");
        return accessToken;
    } else {
        // Token is expired, refresh it
        console.log("Access token expired. Refreshing...");
        try {
            const response = await axios.post('http://localhost:3000/api/auth/refresh', {
                refreshToken: refreshToken,
            });

            const newAccessToken = response.data.accessToken;

            // Store the new access token in local storage
            localStorage.setItem('accessToken', newAccessToken);

            // Update the state (if using a context or global state)
            setAuthTokens({
                accessToken: newAccessToken,
                refreshToken: refreshToken,
            });

            console.log("New access token generated.");
            return newAccessToken;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            // Handle token refresh failure (e.g., log out the user)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAuthTokens(null);
            return null;
        }
    }
};

