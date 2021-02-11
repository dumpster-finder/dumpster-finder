import {createSlice} from "@reduxjs/toolkit";
import Position from "../../models/Position";
import {RootState} from "../store";

interface SliceState {
    position: Position;
    nickname: string;
    // other settings to come, stay tuned!
}

export const configSlice = createSlice({
    name: "config",
    initialState: {
        position: {
            longitude: 0,
            latitude: 0
        },
        nickname: "Anonymous"
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
    },
});

export const { setNickname, setPosition } = configSlice.actions;

export const nicknameSelector = (state: RootState) => state.config.nickname;
export const positionSelector = (state: RootState) => state.config.position;

export default configSlice.reducer;
