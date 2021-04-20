import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import UserDAO from "../users";
import {generateUserID, readWordsFromFile} from "../../utils/IdGeneration";
import {generateSalt, hashPassword, hashUser} from "../../utils/hashing";

const userDAO = UserDAO(Models);
const url = "./utils/wordsEnglish.txt"
readWordsFromFile(url);

beforeAll(setupTestData);

describe("getOne", () => {
    it("should return all store types", async () => {
        const userExists = await userDAO.getOne("crawl daring message team lamp develop")
        expect(userExists).toBe(true);
        const wrongPassword = await userDAO.getOne("crawl daring message team Tore Sporet")
        expect(wrongPassword).toBe(false);
        const wrongUser = await userDAO.getOne("Bob Fridtjof Hansen")
        expect(wrongUser).toBe(false);
    });
});

describe("postOne", () => {
    it("should generate a new user", async () => {
        const userName = await generateUserID();
        const userHash = hashUser(userName);
        const salt = generateSalt();
        const passwordHash = await hashPassword(salt, userName);
        const success = await userDAO.postOne(userHash, salt, passwordHash);
        expect(success);
        expect(passwordHash.length).toBe(200)
    });
});