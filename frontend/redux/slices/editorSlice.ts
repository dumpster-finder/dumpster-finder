import { createSlice } from "@reduxjs/toolkit";
import Dumpster from "../../models/Dumpster";
import { RootState } from "../store";
import Position from "../../models/Position";

/**
 * State for editing/adding dumpsters
 */
interface SliceState {
    dumpster: Dumpster;
    status: "empty" | "changed";
}

const templateDumpster: Dumpster = {
    dumpsterID: 0,
    name: "",
    position: {
        latitude: 0,
        longitude: 0,
    },
    dumpsterType: "",
    storeType: "",
    emptyingSchedule: "",
    cleanliness: 3,
    positiveStoreViewOnDiving: null,
    locked: false,
    rating: 2.5,
};

export const editorSlice = createSlice({
    name: "dumpsters",
    initialState: {
        dumpster: templateDumpster,
        status: "empty",
    } as SliceState,
    reducers: {
        resetEditor: (state) => {
            state.dumpster = templateDumpster;
            state.status = "empty";
        },
        setEditorDumpster: (state, { payload }: { payload: Dumpster }) => {
            state.dumpster = payload;
            state.status = "changed";
        },
        setEditorPosition: (state, { payload }: { payload: Position }) => {
            state.dumpster.position = payload;
            state.status = "changed";
        },
    },
});

export const { resetEditor, setEditorDumpster, setEditorPosition } = editorSlice.actions;

export default editorSlice.reducer;

export const editorStatusSelector = (state: RootState) => state.editor.status;
export const editorDumpsterSelector = (state: RootState) => state.editor.dumpster;
export const editorPositionSelector = (state: RootState) => state.editor.dumpster.position;
