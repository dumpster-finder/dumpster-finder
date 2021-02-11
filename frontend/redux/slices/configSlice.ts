import {createSlice} from "@reduxjs/toolkit";
import Position from "../../models/Position";
import {RootState} from "../store";

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
            longitude: 0,
            latitude: 0
        },
        nickname: "Anonymous",
        darkMode: false,
        firstTime: true
    } as SliceState,
    reducers: {
        /**
         * Set the user's nickname
         *
         * Usage: dispatch(setNickname("Tore på sporet"));
         *
         * @param payload String to set as username
         */
        setNickname: (state, { payload }) => {
            state.nickname = payload;
        },
        /**
         * Set user's position
         *
         * Usage: dispatch(setPosition({ longitude: 42.24, latitude: 24.42 }));
         *
         * @param payload Position to set
         */
        setPosition: (state, { payload }) => {
            state.position = payload;
        },
        setDarkMode: (state, { payload }) => {
            state.darkMode = payload;
        },
        setFirstTime: (state, { payload }) => {
            state.firstTime = payload;
        },
    },
});

export const { setNickname, setPosition, setDarkMode, setFirstTime } = configSlice.actions;

export const nicknameSelector = (state: RootState) => state.config.nickname;
export const positionSelector = (state: RootState) => state.config.position;
export const darkModeSelector = (state: RootState) => state.config.darkMode;
export const firstTimeSelector = (state: RootState) => state.config.firstTime;

export default configSlice.reducer;
