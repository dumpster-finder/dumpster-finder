/**
 * Show a snackbar with info
 *
 * @param message
 */
const info = (message: string) => console.log(message);
// TODO actually have a snackbar

/**
 * Show a snackbar with an error message
 * (and log it to the console as well)
 *
 * @param err     - The error
 * @param message - And optional message to explain it
 */
const error = (err: Error, message?: string) => {
    console.error(message, error);
    // TODO actually have a snackbar
};

export default {
    info,
    error,
};
