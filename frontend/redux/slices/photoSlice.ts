import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RawPhoto } from "../../models/Photo";

/**
 * This slice simply contains a cache of photo URLs and dates
 */
interface SliceState {
    photos: Record<string, RawPhoto[]>;
}

export const photoSlice = createSlice({
    name: "photos",
    initialState: {
        photos: {},
    } as SliceState,
    reducers: {
        /**
         * Adds a single photo to the cache
         *
         * Usage: dispatch(addPhoto({ dumpsterID, photo }));
         */
        addPhoto: (
            { photos },
            { payload }: { payload: { dumpsterID: number; photo: RawPhoto } },
        ) => {
            if (photos[payload.dumpsterID])
                photos[payload.dumpsterID].push(payload.photo);
            else photos[payload.dumpsterID] = [payload.photo];
        },
        /**
         * Adds a list of photos to the cache
         *
         * Usage: dispatch(addPhotos({ dumpsterID, photos }));
         */
        addPhotos: (
            { photos },
            {
                payload,
            }: { payload: { dumpsterID: number; photos: RawPhoto[] } },
        ) => {
            if (photos[payload.dumpsterID])
                photos[payload.dumpsterID].concat(payload.photos);
            else photos[payload.dumpsterID] = payload.photos;
        },
        /**
         * Resets the currently cached photos
         *
         * Usage: dispatch(resetPhotos());
         */
        resetPhotos: state => {
            state.photos = {};
        },
    },
});

export const { addPhoto, addPhotos, resetPhotos } = photoSlice.actions;

export default photoSlice.reducer;

export const allPhotosSelector = (state: RootState) => state.photos.photos;

export const photosSelector = (dumpsterID: number) => ({
    photos: { photos },
}: RootState) => photos[dumpsterID];
