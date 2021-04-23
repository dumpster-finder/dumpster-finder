import store from "./store";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
    tokenSelector,
    setToken,
    refreshToken,
    userIDSelector,
} from "./slices/userSlice";
import Message from "../utils/Message";

/**
 * Always add the current JWT token to a request
 *
 * @param config Request config to modify
 */
export const addTokenHeader = (config: AxiosRequestConfig) => {
    const token = tokenSelector(store.getState());
    if (token) config.headers.jwttoken = token;
    return config;
};

/**
 * Check if there's a token in the headers, or trigger a refresh if there's an error
 *
 * @param response Response to inspect
 */
export const handleTokenResponse = (response: AxiosResponse) => {
    if (!response || !response.headers) return response; // Avoid "undefined is not an object"
    if (response.headers.jwttoken) {
        // If there's a token in the response, set it as the current token
        console.log("Setting new token from response header …");
        store.dispatch(setToken(response.headers.jwttoken));
    }
    return response;
};

/**
 * Trigger a refresh if there's an authentication error
 *
 * @param error Error to inspect
 */
export const handleTokenError = (error: AxiosError) => {
    // TODO decide if we should await this dispatch or not
    if (error.code === "401") {
        // If authorization failed, get a new token
        console.log("401 occurred, refreshing token …");
        const userID = userIDSelector(store.getState());
        store
            .dispatch(refreshToken(userID))
            .catch(e => Message.error(e, "Failed to refresh token"));
    }
    return error;
};
