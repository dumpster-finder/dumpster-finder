import { createSlice } from "@reduxjs/toolkit";
import Position from "../../models/Position";
import { RootState } from "../store";

interface SliceState {
    position: Position;
    nickname: string;
    darkMode: boolean;
    firstTime: boolean;
    // other settings to come, stay tuned!
}

export const configSlice = createSlice({
    name: "config",
    initialState: {
        position: {
            latitude: 63.41775,
            longitude: 10.404344,
        },
        nickname: "Anonymous",
        darkMode: false,
        firstTime: true,
    } as SliceState,
    reducers: {
        /**
         * Set the user's nickname
         *
         * Usage: dispatch(setNickname("Tore på sporet"));
         *
         * @param payload String to set as username
         */
        setNickname: (state, { payload }: { payload: string }) => {
            state.nickname = payload;
        },
        /**
         * Set user's position
         *
         * Usage: dispatch(setPosition({ longitude: 42.24, latitude: 24.42 }));
         *
         * @param payload Position to set
         */
        setPosition: (state, { payload }: { payload: Position }) => {
            state.position = payload;
        },
        setDarkMode: (state, { payload }: { payload: boolean }) => {
            state.darkMode = payload;
        },
        setFirstTime: (state, { payload }: { payload: boolean }) => {
            state.firstTime = payload;
        },
    },
});

export const {
    setNickname,
    setPosition,
    setDarkMode,
    setFirstTime,
} = configSlice.actions;

export const nicknameSelector = (state: RootState) => state.config.nickname;
export const positionSelector = (state: RootState) => state.config.position;
export const darkModeSelector = (state: RootState) => state.config.darkMode;
export const firstTimeSelector = (state: RootState) => state.config.firstTime;

export default configSlice.reducer;
