import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import UserDAO from "../users";
import {generateUserID} from "../../utils/IdGeneration";
import {generateSalt, hashPassword, hashUser} from "../../utils/hashing";

const userDAO = UserDAO(Models);

beforeAll(setupTestData);

describe("getOne", () => {
    it("should return all store types", async () => {
        const userExists = await userDAO.getOne("crawl daring message team lamp develop")
        expect(userExists).toBe(true);
    });
});

describe("postOne", () => {
    it("should generate a new user", async () => {
        const userName = await generateUserID();
        const userHash = hashUser(userName);
        const salt = generateSalt();
        const passwordHash = hashPassword(salt, userName);
        const success = await userDAO.postOne(userHash, salt, passwordHash);
        expect(success);
        expect(passwordHash.length).toBe(200)
    });
});