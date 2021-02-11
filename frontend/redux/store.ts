import {configureStore} from "@reduxjs/toolkit";
import dumpsterReducer from "./slices/dumpsterSlice";
import {useDispatch} from "react-redux";
import configReducer from "./slices/configSlice";

const store = configureStore({
    reducer: {
        dumpsters: dumpsterReducer,
        config: configReducer
    },
});

// type extraction
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
/**
 * Use this instead of useDispatch, for type safety!
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
