import "dotenv/config";

/**
 * Global app config
 * Place dynamic globals in the `extra` property
 */
export default {
    name: "frontend",
    slug: "frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
        softwareKeyboardLayoutMode: "pan",
    },
    web: {
        favicon: "./assets/images/favicon.png",
    },
    extra: {
        apiURL: process.env.API_URL,
        photoURL: process.env.PHOTO_URL,
        debug: Boolean(process.env.DEBUG) || false,
    },
};
