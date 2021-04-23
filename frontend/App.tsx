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
    resetRatedComments,
    languageSelector,
    ratedCommentsSelector,
    visitsSelector,
    registeredVisitsSelector,
    resetRegisteredVisits,
} from "./redux/slices/configSlice";
import {
    fetchNearbyDumpsters,
    setDumpsters,
} from "./redux/slices/dumpsterSlice";
import { resetPhotos } from "./redux/slices/photoSlice";
import {
    setEditorDumpster,
    templateDumpster,
} from "./redux/slices/editorSlice";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { FontAwesomePack } from "./constants/FontAwesome";
import { fetchAllConstants } from "./redux/slices/constantsSlice";
import { FontAwesome5Pack } from "./constants/FontAwesome5";
import i18n from "./i18n";
import { subDays } from "date-fns";
import {
    getUserID,
    refreshToken,
    tokenSelector,
    userNameSelector,
} from "./redux/slices/userSlice";
import Message from "./utils/Message";

// Inner component because Redux store needs to be set up outside any usage of its functionality
// this could be moved to the Navigation component, perhaps
const InnerApp = () => {
    const externalColorScheme = useColorScheme();
    const darkMode = useSelector(darkModeSelector);
    const firstTime = useSelector(firstTimeSelector);
    const position = useSelector(positionSelector);
    const radius = useSelector(radiusSelector);
    const language = useSelector(languageSelector);
    const ratedComments = useSelector(ratedCommentsSelector);
    const visitDate = useSelector(visitsSelector);
    const registeredVisits = useSelector(registeredVisitsSelector);
    const userName = useSelector(userNameSelector);
    const token = useSelector(tokenSelector);

    const visitSinceDate = subDays(
        new Date(),
        visitDate === 0 ? 1 : visitDate === 1 ? 3 : 7,
    )
        .toISOString()
        .split("T")[0];

    useEffect(() => {
        // Do some state-independent resets and fetches at app load
        // TODO Remove this when ratedComments is guaranteed to be undefined on our dev devices
        if (!ratedComments) store.dispatch(resetRatedComments());
        if (!registeredVisits) store.dispatch(resetRegisteredVisits());
        store.dispatch(resetPhotos());
        store.dispatch(fetchAllConstants());
        store.dispatch(setEditorDumpster(templateDumpster));
        if (firstTime) {
            store.dispatch(setDarkMode(externalColorScheme === "dark"));
            // unset firstTime only AFTER the intro page has been shown!
        }
    }, []);

    useEffect(() => {
        // Refresh token when the app loads!
        if (userName) store.dispatch(refreshToken(userName));
    }, []);

    useEffect(() => {
        if (!userName) {
            // should be the case only when you *first* open the app
            store.dispatch(getUserID()).catch(e => console.error(e));
            // User will have to press a retry button if it did not work
            // (for the time being)
        } else if (!token) {
            store.dispatch(refreshToken(userName));
            console.log("Refreshing token for the first time …");
        } else {
            // TODO handle timeout loop, if at all
            // setTimeout(() => store.dispatch(refreshToken(userName)), 60000); // timeout in a minute
        }
    }, [userName, token]);

    useEffect(() => {
        // TODO reconsider the 1st part
        store.dispatch(setDumpsters([]));
        // Fetch dumpsters each time position, visits or radius changes
        store.dispatch(
            fetchNearbyDumpsters({ position, radius, visitSinceDate }),
        );
    }, [position, radius, visitDate]);

    useEffect(() => {
        // Change language if language has changed (hahaha)
        i18n.changeLanguage(language).catch(e =>
            Message.error(e, "Could not change language"),
        );
    }, [language]);

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
