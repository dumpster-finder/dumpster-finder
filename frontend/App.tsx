import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider, useSelector } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
    darkModeSelector,
    firstTimeSelector,
    positionSelector,
    radiusSelector,
    setDarkMode,
} from "./redux/slices/configSlice";
import {
    fetchNearbyDumpsters,
    setDumpsters,
} from "./redux/slices/dumpsterSlice";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { FontAwesomePack } from "./constants/FontAwesome";
import { fetchAllConstants } from "./redux/slices/constantsSlice";
import { FontAwesome5Pack } from "./constants/FontAwesome5";

// Inner component because Redux store needs to be set up outside any usage of its functionality
// this could be moved to the Navigation component, perhaps
const InnerApp = () => {
    const externalColorScheme = useColorScheme();
    const darkMode = useSelector(darkModeSelector);
    const firstTime = useSelector(firstTimeSelector);
    const position = useSelector(positionSelector);
    const radius = useSelector(radiusSelector);

    useEffect(() => {
        store.dispatch(fetchAllConstants());
        if (firstTime) {
            store.dispatch(setDarkMode(externalColorScheme === "dark"));
            // unset firstTime only AFTER the intro page has been shown!
        }
    }, []);

    useEffect(() => {
        // TODO reconsider the 1st part
        store.dispatch(setDumpsters([]));
        // Fetch dumpsters each time position or radius changes
        store.dispatch(fetchNearbyDumpsters({ position, radius }));
    }, [position, radius]);

    return (
        <SafeAreaProvider>
            <IconRegistry
                icons={[EvaIconsPack, FontAwesomePack, FontAwesome5Pack]}
            />
            <ApplicationProvider
                {...eva}
                theme={darkMode ? eva.dark : eva.light}
            >
                <Navigation colorScheme={externalColorScheme} />
                <StatusBar
                    translucent={
                        false /* Letting it be true creates issues with Kitten popovers */
                    }
                    style="light"
                />
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
