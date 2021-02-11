import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import Dumpster from "../../models/Dumpster";
import Position from "../../models/Position";
import { setPosition } from "./configSlice";
import { useAppDispatch } from "../store";

/**
 * The dumpster list will be fetched asynchronously,
 * thus requiring some extra state for bookkeeping.
 */
interface SliceState {
    dumpsters: Dumpster[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

/**
 * Fetch dumpsters around the given coordinate
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
                            new Dumpster({
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
                            }),
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
    } as SliceState,
    reducers: {
        // idk if this even makes sence
        addDumpster: ({ dumpsters }, { payload }) => {
            dumpsters.push(payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(setPosition, (state, action) => {
            const dispatch = useAppDispatch();
            dispatch(fetchNearbyDumpsters(action.payload));
        })
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

export const { addDumpster } = dumpsterSlice.actions;

export default dumpsterSlice.reducer;

export const selectDumpsterByID = (state: SliceState, dumpsterID: number) =>
    state.dumpsters.find(d => d.dumpsterID === dumpsterID);
