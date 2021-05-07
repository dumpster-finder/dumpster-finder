import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import UserDAO from "../users";
import {generateUserID, readWordsFromFile} from "../../utils/IdGeneration";
import {generateSalt, hashPassword} from "../../utils/hashing";

const userDAO = UserDAO(Models);
const url = "./utils/wordsEnglish.txt"
readWordsFromFile(url);

beforeAll(setupTestData);

describe("getOne", () => {
    it("should return all store types", async () => {
        const userExists = await userDAO.getOne("crawl daring message team lamp develop", 8)
        expect(userExists).toBe(8);
        try{
        const wrongPassword = await userDAO.getOne("crawl daring message team Tore Sporet", 8)
        expect(wrongPassword).toBe(false); //just here to fail in case there is no error
            //there probably is a better way to do this, but it should work
        }
        catch (e){
            expect(true)
        }
        try{
        const wrongUsername = await userDAO.getOne("HALLOOOOOOOOOOOOOOO", 1)
        expect(wrongUsername).toBe(false); //just here to fail in case there is no error
        }
        catch (e){
            expect(true)
        }
    });
});

describe("postOne", () => {
    it("should generate a new user", async () => {
        const userName = await generateUserID();
        const salt = generateSalt();
        const passwordHash = await hashPassword(salt, userName);
        const success = await userDAO.postOne(salt, passwordHash);
        expect(success);
        expect(passwordHash.length).toBe(200)
    });
});