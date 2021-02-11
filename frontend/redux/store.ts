import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import dumpsterReducer from "./slices/dumpsterSlice";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import configReducer from "./slices/configSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Our marvellous, almighty Store of global data
 */
const store = configureStore({
    reducer: persistReducer(
        {
            key: "root",
            storage: AsyncStorage,
        },
        combineReducers({
            dumpsters: dumpsterReducer,
            config: configReducer,
        }),
    ),
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

// type extraction
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/**
 * Use this instead of useDispatch, for type safety!
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
export default store;