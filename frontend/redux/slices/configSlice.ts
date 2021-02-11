import {createSlice} from "@reduxjs/toolkit";
import Position from "../../models/Position";

interface SliceState {
    position: Position;
    nickname: string;
    // other settings to come
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
        setNickname: (state, { payload }) => {
            state.nickname = payload;
        },
        setPosition: (state, { payload }) => {
            state.position = payload;
        },
    },
});

export const { setNickname, setPosition } = configSlice.actions;

export default configSlice.reducer;
