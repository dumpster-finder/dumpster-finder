import { Alert } from "react-native";

/**
 * Show a <something> with info
 *
 * @param message - A message
 */
const info = (message: string) => {
    console.log(message);
    Alert.alert(message);
};

/**
 * Show a <something> with an error message
 * (and log it to the console as well)
 *
 * @param err     - The error
 * @param message - And optional message to explain it
 */
const error = (err: Error, message?: string) => {
    console.error(message, error);
    Alert.alert(message || "An error occurred", err.message);
    // TODO actually have some better-looking thing
};

export default {
    info,
    error,
};
