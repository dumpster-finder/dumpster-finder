import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Dumpster from "../../models/Dumpster";
import Position from "../../models/Position";
import { RootState } from "../store";
import { DumpsterService } from "../../services";

/**
 * The dumpster list will be fetched asynchronously,
 * thus requiring some extra state for bookkeeping.
 */
interface SliceState {
    dumpsters: Record<string, Dumpster>;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    currentDumpster: Dumpster | null;
}

/**
 * Fetch dumpsters around the given coordinate
 *
 * Usage: dispatch(fetchNearbyDumpsters({latitude: 0, longitude: 0}, 6000))
 */
export const fetchNearbyDumpsters = createAsyncThunk(
    "dumpsters/fetchNearbyDumpsters",
    async ({ position, radius }: { position: Position; radius: number }) => {
        // the error is handled outside
        // this is a very temporary replacement!
        // less temporary now...
        // error should be handled automatically
        // TODO either fetch state or take radius as additional arg

        return await DumpsterService.getNearbyDumpsters(position, radius);
    },
);

export const dumpsterSlice = createSlice({
    name: "dumpsters",
    initialState: {
        dumpsters: {},
        status: "idle",
        error: null,
        currentDumpster: null,
    } as SliceState,
    reducers: {
        /**
         * Adds a single dumpster to the cache
         *
         * Usage: dispatch(addDumpster(someDumpster));
         *
         * @param payload A dumpster object
         */
        addDumpster: ({ dumpsters }, { payload }: { payload: Dumpster }) => {
            console.log(payload)
            dumpsters[payload.dumpsterID] = payload;
        },
        /**
         * Adds a list of dumpsters to the cache
         *
         * Usage: dispatch(addDumpsters(someListOfDumpsters));
         *
         * @param payload A list of dumpsters
         */
        addDumpsters: ({ dumpsters }, { payload }: { payload: Dumpster[] }) => {
            payload.forEach(d => (dumpsters[d.dumpsterID] = d));
        },
        /**
         * Replaces the currently cached dumpsters
         * (useful for when the app loads a new)
         *
         * Usage: dispatch(setDumpsters(someListOfDumpsters));
         *
         * @param payload A list of dumpsters
         */
        setDumpsters: (state, { payload }: { payload: Dumpster[] }) => {
            state.dumpsters = {};
            payload.forEach(d => (state.dumpsters[d.dumpsterID] = d));
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
                action.payload.forEach(
                    d => (state.dumpsters[d.dumpsterID] = d),
                );
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

export const {
    addDumpster,
    addDumpsters,
    setDumpsters,
    setCurrentDumpster,
} = dumpsterSlice.actions;

export default dumpsterSlice.reducer;

export const allDumpstersSelector = (state: RootState) => {
    const res = [];
    for (const key in state.dumpsters.dumpsters) {
        res.push(state.dumpsters.dumpsters[key]);
    }
    return res;
};

export const dumpsterSelectorByID = (dumpsterID: number) => (state: RootState) =>
    state.dumpsters.dumpsters[dumpsterID];

export const currentDumpsterSelector = (state: RootState) =>
    state.dumpsters.currentDumpster;
