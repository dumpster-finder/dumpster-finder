import { Alert } from "react-native";
import { AxiosError } from "axios";

/**
 * Show a <something> with info
 *
 * @param message - A message
 */
const info = (message: string) => {
    console.log(message);
    Alert.alert(message);
};

const isAxiosError = (err: Error): err is AxiosError => "isAxiosError" in err;

/**
 * Show a <something> with an error message
 * (and log it to the console as well)
 *
 * @param err     - The error
 * @param message - And optional message to explain it
 */
const error = (err: Error, message?: string) => {
    console.error(message, err);
    let title = message || "An error occured";
    let details = err.message;
    if (isAxiosError(err) && err.response && err.response.data.error) {
        details = err.response.data.error;
    }
    Alert.alert(title, details);
    // TODO actually have some better-looking thing
};

export default {
    info,
    error,
};
