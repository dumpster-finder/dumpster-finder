import {StatusBar} from "expo-status-bar";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {ThemeProvider} from "react-native-elements";
import {theme} from "./constants/Theme";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <ThemeProvider useDark={colorScheme === "dark"} theme={theme}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </ThemeProvider>
            </SafeAreaProvider>
        );
    }
}
