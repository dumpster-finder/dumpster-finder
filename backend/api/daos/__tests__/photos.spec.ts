import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import PhotoDAO from "../photos";
import { PostPhoto } from "../../types/Photo";
import {APIError, NotFoundError} from "../../types/errors";

const photoDAO = PhotoDAO(Models);

beforeAll(setupTestData);

const photoProperties = ["photoID", "url", "dateAdded"];

const photo: PostPhoto = {
    url: "https://nowhere.com/pic/hgwuohgworhgwrgwrg.jpg",
    userID: "temp1",
};

describe("getAll", () => {
    it("should return all photos for a given dumpster", async () => {
        const photos = await photoDAO.getAll(1);
        expect(photos[0].url).toEqual(
            "https://upload.wikimedia.org/wikipedia/commons/4/4c/Dumpster-non.JPG",
        );
        photos.forEach(photo =>
            photoProperties.forEach(prop => expect(photo).toHaveProperty(prop)),
        );
    });

    it("should reject if a dumpster does not exist", async () => {
        await expect(photoDAO.getAll(832052))
            .rejects.toEqual(new NotFoundError("No such dumpster"));
    });
});

describe("addOne", () => {
    it("should add a valid photo", async () => {
        const result = await photoDAO.addOne(2, photo);
        expect(result).not.toBeUndefined();
        expect(result?.userID).toEqual(photo.userID);
        expect(result?.url).toEqual(photo.url);
    });

    it("should not add a photo to a nonexistent dumpster", async () => {
        await expect(photoDAO.addOne(2091855, photo))
            .rejects.toBeInstanceOf(APIError);
    });
});
