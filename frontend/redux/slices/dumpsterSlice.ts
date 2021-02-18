import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Dumpster from "../../models/Dumpster";
import Position from "../../models/Position";
import {RootState} from "../store";

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
    async (location: Position) => {
        // the error is handled outside
        // this is a very temporary replacement!
        const data: { dumpsters: Dumpster[] } = await new Promise(resolve =>
            setTimeout(
                () =>
                    resolve({
                        dumpsters: [
                            {
                                dumpsterID: 2,
                                dumpsterType: "Dumpster",
                                cleanliness: 1,
                                locked: true,
                                emptyingSchedule: "Every day of the week",
                                name: "Bunnpris Moholt",
                                position: {
                                    longitude: 24,
                                    latitude: 23,
                                },
                                positiveStoreViewOnDiving: true,
                                rating: 2,
                                storeType: "Groceries",
                            },
                        ],
                    }),
                3000,
            ),
        );
        return data.dumpsters;
    },
);

export const dumpsterSlice = createSlice({
    name: "dumpsters",
    initialState: {
        dumpsters: [],
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
                state.dumpsters.concat(action.payload);
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

export const { addDumpster, addDumpsters, setCurrentDumpster } = dumpsterSlice.actions;

export default dumpsterSlice.reducer;

export const allDumpstersSelector = (state: RootState) =>
    state.dumpsters.dumpsters

export const dumpsterSelectorByID = (state: RootState, dumpsterID: number) =>
    state.dumpsters.dumpsters.find(d => d.dumpsterID === dumpsterID);

export const currentDumpsterSelector = (state: RootState) =>
    state.dumpsters.currentDumpster;
