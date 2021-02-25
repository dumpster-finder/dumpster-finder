import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./constants/Theme";
import { Provider, useSelector } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
    darkModeSelector,
    firstTimeSelector,
    setDarkMode,
    setFirstTime,
} from "./redux/slices/configSlice";
import { setDumpsters } from "./redux/slices/dumpsterSlice";
import { testDumpsters } from "./constants/TestData";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {FontAwesomePack} from "./constants/FontAwesome";

// Inner component because Redux store needs to be set up outside any usage of its functionality
// this could be moved to the Navigation component, perhaps
const InnerApp = () => {
    const externalColorScheme = useColorScheme();
    const darkMode = useSelector(darkModeSelector);
    const firstTime = useSelector(firstTimeSelector);

    useEffect(() => {
        store.dispatch(setDumpsters(testDumpsters));
        if (firstTime) {
            store.dispatch(setDarkMode(externalColorScheme === "dark"));
            // unset firstTime only AFTER the intro page has been shown!
            // perhaps you could just navigate TO the intro page right here.
            // navigator.navigate("thatpage") or sth, idk
            store.dispatch(setFirstTime(false));
        }
    }, []);

    return (
        <SafeAreaProvider>
            <IconRegistry icons={[EvaIconsPack, FontAwesomePack]} />
            <ApplicationProvider
                {...eva}
                theme={darkMode ? eva.dark : eva.light}
            >
                {/* TODO: Remove Elements' ThemeProvider... */}
                <ThemeProvider
                    useDark={externalColorScheme === "dark"}
                    theme={theme}
                >
                    <Navigation colorScheme={externalColorScheme} />
                    <StatusBar />
                </ThemeProvider>
            </ApplicationProvider>
        </SafeAreaProvider>
    );
};

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <InnerApp />
                </PersistGate>
            </Provider>
        );
    }
}
