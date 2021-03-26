import { createSlice } from "@reduxjs/toolkit";
import Position from "../../models/Position";
import { RootState } from "../store";

interface SliceState {
    position: Position;
    radius: number;
    nickname: string;
    darkMode: boolean;
    firstTime: boolean;
    language: string;
    // other settings to come, stay tuned!
}

export const configSlice = createSlice({
    name: "config",
    initialState: {
        position: {
            latitude: 63.41775,
            longitude: 10.404344,
        },
        radius: 5000,
        nickname: "Anonymous",
        darkMode: false,
        firstTime: true,
        language: "no",
    } as SliceState,
    reducers: {
        setNickname: (state, { payload }: { payload: string }) => {
            state.nickname = payload;
        },
        setPosition: (state, { payload }: { payload: Position }) => {
            state.position = payload;
        },
        setRadius: (state, { payload }: { payload: number }) => {
            state.radius = payload;
        },
        setDarkMode: (state, { payload }: { payload: boolean }) => {
            state.darkMode = payload;
        },
        setFirstTime: (state, { payload }: { payload: boolean }) => {
            state.firstTime = payload;
        },
        setLanguage: (state, { payload }: { payload: string }) => {
            state.language = payload;
        },
    },
});

export const {
    /**
     * Set the user's nickname
     *
     * Usage: dispatch(setNickname("Tore på sporet"));
     *
     * @param payload String to set as username
     */
    setNickname,
    /**
     * Set user's position
     *
     * Usage: dispatch(setPosition({ longitude: 42.24, latitude: 24.42 }));
     *
     * @param payload Position to set
     */
    setPosition,
    /**
     * Set whether the user prefers dark mode or not
     *
     * Usage: dispatch(setDarkMode(true));
     *
     * @param payload true if dark mode, false if light mode
     */
    setDarkMode,
    /**
     * Set whether this is the user's first time launching the app or not
     *
     * Usage: dispatch(setFirstTime(false));
     *
     * @param payload true or false
     */
    setFirstTime,

    /**
     * Set the radius of dumpsters shown from given position
     *
     * Usage: dispatch(setRadius(1000));
     *
     * @param payload radius in meters
     */
    setRadius,

    /**
     * Set preferred language in app
     *
     * Usage: dispatch(setLanguage("Norwegian"));
     *
     * @param payload Language in string
     */
    setLanguage,
} = configSlice.actions;

export const nicknameSelector = (state: RootState) => state.config.nickname;
export const positionSelector = (state: RootState) => state.config.position;
export const radiusSelector = (state: RootState) => state.config.radius;
export const darkModeSelector = (state: RootState) => state.config.darkMode;
export const firstTimeSelector = (state: RootState) => state.config.firstTime;
export const languageSelector = (state: RootState) => state.config.language;
export default configSlice.reducer;
