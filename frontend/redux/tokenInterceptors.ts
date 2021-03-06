import store from "./store";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
    tokenSelector,
    setToken,
    refreshToken,
    userNameSelector,
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
    if (token) config.headers["x-access-token"] = token;
    return config;
};

/**
 * Check if there's a token in the headers, or trigger a refresh if there's an error
 *
 * @param response Response to inspect
 */
export const handleTokenResponse = (response: AxiosResponse) => {
    if (!response || !response.headers) return response; // Avoid "undefined is not an object"
    if (response.headers["x-access-token"]) {
        // If there's a token in the response, set it as the current token
        console.log("Setting new token from response header …");
        store.dispatch(setToken(response.headers["x-access-token"]));
    }
    return response;
};

/**
 * Trigger a refresh if there's an authentication error
 *
 * @param error Error to inspect
 */
export const handleTokenError = (error: AxiosError) => {
    if (error.response && error.response.data.statusCode === 401) {
        // If authorization failed, get a new token
        console.log("401 occurred, refreshing token …");
        const userID = userIDSelector(store.getState());
        const userName = userNameSelector(store.getState());
        // Don't wait for the dispatch to finish
        store
            .dispatch(refreshToken({ userID, userName }))
            .catch(e => Message.error(e, "Failed to refresh token"));
    }

    // Make sure Axios *still* treats the error as an error
    return Promise.reject(error);
};
