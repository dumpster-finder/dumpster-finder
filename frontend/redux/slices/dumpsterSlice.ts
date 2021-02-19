import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Dumpster from "../../models/Dumpster";
import Position from "../../models/Position";
import {RootState} from "../store";
import {testDumpsters} from "../../constants/TestData";
import {DumpsterService} from "../../services";

/**
 * The dumpster list will be fetched asynchronously,
 * thus requiring some extra state for bookkeeping.
 */
interface SliceState {
    dumpsters: Dumpster[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    currentDumpster: Dumpster | null;
}

/**
 * Fetch dumpsters around the given coordinate
 *
 * Usage: dispatch(fetchNearbyDumpsters({latitude: 0, longitude: 0}))
 */
export const fetchNearbyDumpsters = createAsyncThunk(
    "dumpsters/fetchNearbyDumpsters",
    async (position: Position) => {
        // the error is handled outside
        // this is a very temporary replacement!
        // less temporary now...
        // error should be handled automatically
        // TODO either fetch state or take radius as additional arg
        return await DumpsterService.getNearbyDumpsters(position, 60);
    },
);

export const dumpsterSlice = createSlice({
    name: "dumpsters",
    initialState: {
        dumpsters: testDumpsters,
        status: "idle",
        error: null,
        currentDumpster: null,
    } as SliceState,
    reducers: {
        // idk if this even makes sence
        addDumpster: ({ dumpsters }, { payload }) => {
            dumpsters.push(payload);
        },
        addDumpsters: ({ dumpsters }, { payload }: { payload: Dumpster[] }) => {
            dumpsters.push(...payload);
        },
        setDumpsters: (state, { payload }: { payload: Dumpster[] }) => {
            state.dumpsters = payload;
        },
        setCurrentDumpster: (state, { payload }) => {
            state.currentDumpster = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchNearbyDumpsters.pending,
            (state: SliceState, action) => {
                state.status = "loading";
            },
        );
        builder.addCase(
            fetchNearbyDumpsters.fulfilled,
            (state: SliceState, action) => {
                state.status = "succeeded";
                state.dumpsters.push(...action.payload);
            },
        );
        builder.addCase(
            fetchNearbyDumpsters.rejected,
            (state: SliceState, action) => {
                state.status = "failed";
                state.error = action.error.message!;
            },
        );
    },
});

export const { addDumpster, addDumpsters, setDumpsters, setCurrentDumpster } = dumpsterSlice.actions;

export default dumpsterSlice.reducer;

export const allDumpstersSelector = (state: RootState) =>
    state.dumpsters.dumpsters

export const dumpsterSelectorByID = (state: RootState, dumpsterID: number) =>
    state.dumpsters.dumpsters.find(d => d.dumpsterID === dumpsterID);

export const currentDumpsterSelector = (state: RootState) =>
    state.dumpsters.currentDumpster;
