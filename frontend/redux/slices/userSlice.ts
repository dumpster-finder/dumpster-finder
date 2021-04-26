import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserService } from "../../services";

/**
 * State with bookkeeping for token
 */
interface SliceState {
    userName: string; // The actual plain text version of the user ID
    userID: number; // The surrogate key, useful for checking if a comment is your own
    token: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

/**
 * Fetch a generated user ID
 *
 * Usage: dispatch(getUserID())
 */
export const getUserID = createAsyncThunk("user/getUserID", async () => {
    return await UserService.getUserID();
});

/**
 * Fetch dumpsters around the given coordinate
 *
 * Usage: dispatch(refreshToken("duck speaking mountain quack))
 */
export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async (userName: string) => {
        const token = await UserService.authenticate(userName);
        if (!token) throw new Error("Token was found but it is undefined");
        return token;
    },
);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: "",
        userID: 0,
        token: "",
        status: "idle",
        error: null,
    } as SliceState,
    reducers: {
        /**
         * Sets the user ID
         *
         * Usage: dispatch(setUserName("two fellow people on a road"));
         *
         * @param payload The user ID
         */
        setUserName: (state, { payload }: { payload: string }) => {
            state.userName = payload;
        },
        /**
         * Sets the numeric user ID
         *
         * Usage: dispatch(setUserID(23));
         *
         * @param payload The user ID
         */
        setUserID: (state, { payload }: { payload: number }) => {
            state.userID = payload;
        },
        /**
         * Sets the active token
         *
         * Usage: dispatch(setToken("hgwr80gh408yh048tgh2408gh420g8h2g0hwgor"));
         *
         * @param payload The token
         */
        setToken: (state, { payload }: { payload: string }) => {
            state.token = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getUserID.pending, (state: SliceState, { payload }) => {
            state.status = "loading";
        });
        builder.addCase(
            getUserID.fulfilled,
            (state: SliceState, { payload }) => {
                state.status = "succeeded";
                state.userName = payload.userName;
                state.userID = payload.userID;
            },
        );
        builder.addCase(getUserID.rejected, (state: SliceState, { error }) => {
            console.error(error);
            state.status = "failed";
            state.error = error.message!;
        });
        builder.addCase(
            refreshToken.pending,
            (state: SliceState, { payload }) => {
                state.status = "loading";
            },
        );
        builder.addCase(
            refreshToken.fulfilled,
            (state: SliceState, { payload }) => {
                state.status = "succeeded";
                state.token = payload;
            },
        );
        builder.addCase(
            refreshToken.rejected,
            (state: SliceState, { error }) => {
                console.error(error);
                state.status = "failed";
                state.error = error.message!;
                state.token = ""; // indicate that there *is* no token rn
            },
        );
    },
});

export const { setToken, setUserName, setUserID } = userSlice.actions;

export default userSlice.reducer;

export const userIDSelector = (state: RootState) => state.user.userID;
export const userNameSelector = (state: RootState) => state.user.userName;
export const tokenSelector = (state: RootState) => state.user.token;
export const userStatusSelector = (state: RootState) => state.user.status;
