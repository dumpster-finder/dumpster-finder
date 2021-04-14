import { MyModels } from "../models";
import { PhotoAttributes } from "../models/Photos";
import Photo from "../types/Photo";

const modelToPhoto = ({ photoID, url, dateAdded }: PhotoAttributes): Photo => ({
    photoID,
    url,
    dateAdded,
});

export default function({ Photos }: MyModels) {
    return {
        /**
         * Get photos for a given dumpster
         *
         * @param dumpsterID
         */
        getAll: (dumpsterID: number) =>
            Photos.findAll({
                where: { dumpsterID },
            }).then(ps => ps.map(modelToPhoto)),
    };
}
