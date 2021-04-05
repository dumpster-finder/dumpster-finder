import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import CommentDAO from "../comments";
import { Comments } from "../../models/Comments";

const commentDAO = CommentDAO(Models);

beforeAll(setupTestData);

describe("getAllForDumpster", () => {
    it("should return all comments for a given dumpster", async () => {
        const comment = await commentDAO.getAllForDumpster(1);
        expect(comment.length).toBeGreaterThan(0);
    });
});

describe("addOne", () => {
    it("should add a comment to a dumpster", async () => {
        const commentBefore = await commentDAO.getAllForDumpster(1);
        const comment = await commentDAO.addOne({
            dumpsterID: 1,
            nickname: "FreeFood",
            comment: "I love free food",
            rating: 0,
            date: "2021-03-31",
        });
        const commentAfter = await commentDAO.getAllForDumpster(1);
        expect(comment).not.toBe(undefined);
        expect(commentAfter.length).toBe(commentBefore.length + 1);
    });
});

describe("updateOne", () => {
    it("should change a comment so the rating is higher", async () => {
        const comment = await commentDAO.updateOne(1, 1);
        const commentAfter = await commentDAO.getAllForDumpster(1);
        const changedComment = commentAfter.find(com => (com.commentID = 1));
        expect(comment).not.toBe(undefined);
        // @ts-ignore
        expect(changedComment.rating).toBe(6);
    });
});
