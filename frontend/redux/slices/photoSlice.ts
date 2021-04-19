import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RawPhoto } from "../../models/Photo";

/**
 * This slice simply contains a cache of photo URLs and dates
 */
interface SliceState {
    photos: Record<string, RawPhoto[]>;
    coverPhotos: Record<string, RawPhoto>;
    uploadURI: string;
}

export const photoSlice = createSlice({
    name: "photos",
    initialState: {
        photos: {},
        coverPhotos: {},
        uploadURI: "",
    } as SliceState,
    reducers: {
        /**
         * Adds a single photo to the cache
         *
         * Usage: dispatch(addPhoto({ dumpsterID, photo }));
         */
        addPhoto: (
            { photos, coverPhotos },
            {
                payload: { dumpsterID, photo },
            }: { payload: { dumpsterID: number; photo: RawPhoto } },
        ) => {
            if (photos[dumpsterID])
                photos[dumpsterID] = [photo, ...photos[dumpsterID]];
            else photos[dumpsterID] = [photo];
            // will be the most recent one!
            coverPhotos[dumpsterID] = photo;
        },
        /**
         * Adds a list of photos to the cache
         *
         * Usage: dispatch(addPhotos({ dumpsterID, photos }));
         */
        addPhotos: (
            { photos, coverPhotos },
            {
                payload,
            }: { payload: { dumpsterID: number; photos: RawPhoto[] } },
        ) => {
            if (photos[payload.dumpsterID])
                photos[payload.dumpsterID].concat(payload.photos);
            else photos[payload.dumpsterID] = payload.photos;
            if (payload.photos.length > 0)
                // remember to add this if ok
                coverPhotos[payload.dumpsterID] = payload.photos[0];
        },
        setCoverPhoto: (
            { coverPhotos },
            { payload }: { payload: { dumpsterID: number; photo: RawPhoto } },
        ) => {
            coverPhotos[payload.dumpsterID] = payload.photo;
        },
        /**
         * Resets the currently cached photos
         *
         * Usage: dispatch(resetPhotos());
         */
        resetPhotos: state => {
            state.photos = {};
            state.coverPhotos = {};
        },
        setUploadURI: (state, { payload }: { payload: string }) => {
            state.uploadURI = payload;
        },
    },
});

export const {
    addPhoto,
    addPhotos,
    setCoverPhoto,
    resetPhotos,
    setUploadURI,
} = photoSlice.actions;

export default photoSlice.reducer;

export const uploadURISelector = (state: RootState) => state.photos.uploadURI;
export const allPhotosSelector = (state: RootState) => state.photos.photos;

export const coverPhotoMapSelector = (state: RootState) =>
    state.photos.coverPhotos;

export const coverPhotoSelector = (dumpsterID: number) => ({
    photos: { coverPhotos },
}: RootState) => coverPhotos[dumpsterID];

export const photosSelector = (dumpsterID: number) => ({
    photos: { photos },
}: RootState) => photos[dumpsterID];
