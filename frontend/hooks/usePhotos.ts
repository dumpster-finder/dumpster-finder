import Photo from "../models/Photo";
import { PhotoService } from "../services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { allPhotosSelector, addPhotos } from "../redux/slices/photoSlice";
import { useAppDispatch } from "../redux/store";

export default function() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const dumpster = useSelector(currentDumpsterSelector);
    const photoCache = useSelector(allPhotosSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dumpster) {
            if (photoCache[dumpster.dumpsterID]) {
                setPhotos(
                    photoCache[dumpster.dumpsterID].map(p => new Photo(p)),
                );
            } else {
                PhotoService.getPhotos(dumpster.dumpsterID)
                    .then(ps => {
                        setPhotos(ps);
                        dispatch(
                            addPhotos({
                                dumpsterID: dumpster.dumpsterID,
                                photos: ps.map(p => p.toJSON()),
                            }),
                        );
                    })
                    .catch(e =>
                        console.error(
                            "Could not find photos for this dumpster",
                            e,
                        ),
                    );
            }
        }
    }, [dumpster]);

    return photos;
}
