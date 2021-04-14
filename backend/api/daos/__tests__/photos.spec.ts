import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import PhotoDAO from "../photos";

const photoDAO = PhotoDAO(Models);

beforeAll(setupTestData);

const photoProperties = ["photoID", "url", "dateAdded"];

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
});
