import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
    CategoryService,
    DumpsterTypeService,
    StoreTypeService,
} from "../../services";
import { Category, DumpsterType, StoreType } from "../../models/Constants";

/**
 * State for various constants
 */
interface SliceState {
    dumpsterTypes: Record<number, string>;
    storeTypes: Record<number, string>;
    categories: Record<number, string>;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

/**
 * Fetch all constant values from db
 *
 * Usage: dispatch(fetchAllConstants())
 */
export const fetchAllConstants = createAsyncThunk(
    "constants/fetchAllConstants",
    async () => {
        return {
            dumpsterTypes: await DumpsterTypeService.getAll(),
            storeTypes: await StoreTypeService.getAll(),
            categories: await CategoryService.getAll(),
        };
    },
);

export const constantsSlice = createSlice({
    name: "constants",
    initialState: {
        dumpsterTypes: {},
        storeTypes: {},
        categories: {},
        status: "idle",
        error: null,
    } as SliceState,
    reducers: {
        setDumpsterTypes: (state, { payload }: { payload: DumpsterType[] }) => {
            state.dumpsterTypes = {};
            payload.forEach(
                t => (state.dumpsterTypes[t.dumpsterTypeID] = t.name),
            );
        },
        setStoreTypes: (state, { payload }: { payload: StoreType[] }) => {
            state.storeTypes = {};
            payload.forEach(t => (state.storeTypes[t.storeTypeID] = t.name));
        },
        setCategories: (state, { payload }: { payload: Category[] }) => {
            state.categories = {};
            payload.forEach(c => (state.categories[c.categoryID] = c.name));
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchAllConstants.pending,
            (state: SliceState, action) => {
                state.status = "loading";
            },
        );
        builder.addCase(
            fetchAllConstants.fulfilled,
            (
                state: SliceState,
                { payload: { categories, dumpsterTypes, storeTypes } },
            ) => {
                state.status = "succeeded";
                dumpsterTypes.forEach(
                    c => (state.dumpsterTypes[c.dumpsterTypeID] = c.name),
                );
                storeTypes.forEach(
                    c => (state.storeTypes[c.storeTypeID] = c.name),
                );
                categories.forEach(
                    c => (state.categories[c.categoryID] = c.name),
                );
            },
        );
        builder.addCase(
            fetchAllConstants.rejected,
            (state: SliceState, action) => {
                console.error(action.error);
                state.status = "failed";
                state.error = action.error.message!;
            },
        );
    },
});

export const {
    setDumpsterTypes,
    setStoreTypes,
    setCategories,
} = constantsSlice.actions;

export default constantsSlice.reducer;

/// Selectors that return objects mapping from ID to name ///
/**
 * Selects the actual mapping of ID to dumpster type
 */
export const dumpsterTypeMappingSelector = ({
    constants: { dumpsterTypes },
}: RootState) => dumpsterTypes;

/**
 * Selects the actual mapping of ID to store type
 */
export const storeTypeMappingSelector = ({
    constants: { storeTypes },
}: RootState) => storeTypes;

/**
 * Selects the actual mapping of ID to category
 */
export const categoryMappingSelector = ({
    constants: { categories },
}: RootState) => categories;

/// Selectors that return lists of names ///
/**
 * Selects a list of possible dumpster types
 */
export const dumpsterTypesSelector = ({
    constants: { dumpsterTypes },
}: RootState) => Object.values(dumpsterTypes).filter(Boolean);

/**
 * Selects a list of possible store types
 */
export const storeTypesSelector = ({ constants: { storeTypes } }: RootState) =>
    Object.values(storeTypes).filter(Boolean);

/**
 * Selects a list of possible categories
 */
export const categoriesSelector = ({ constants: { categories } }: RootState) =>
    Object.values(categories).filter(Boolean);
