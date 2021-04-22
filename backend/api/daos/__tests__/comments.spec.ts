import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import CommentDAO, { COMMENT_RATING_TRESHOLD } from "../comments";

const commentDAO = CommentDAO(Models);

beforeAll(setupTestData);

describe("getAllForDumpster", () => {
    it("should return all comments for a given dumpster", async () => {
        const comments = await commentDAO.getAllForDumpster(1);
        expect(comments.length).toBe(3);
        // Check order and contents
        expect(comments.map(c => c.nickname)).toEqual([
            "Trash panda",
            "TrashBin",
            "Tore på sporet",
        ]);
        // Then check that it is sorted by date
        expect(
            comments.every(
                (c, i) =>
                    i === comments.length - 1 ||
                    c.date.getTime() >= comments[i + 1].date.getTime(),
            ),
        ).toBeTruthy();
    });

    it("should hide negatively rated comments by default", async () => {
        const comments = await commentDAO.getAllForDumpster(6);
        expect(comments.length).toBe(3);
        comments.forEach(c =>
            expect(c.rating).toBeGreaterThanOrEqual(COMMENT_RATING_TRESHOLD),
        );
    });

    it("should show negatively rated comments when it is told to", async () => {
        const comments = await commentDAO.getAllForDumpster(6, {
            showNegative: true,
        });
        expect(comments.length).toBe(4);
        expect(
            comments.some(c => c.rating < COMMENT_RATING_TRESHOLD),
        ).toBeTruthy();
    });
});

describe("addOne", () => {
    it("should add a comment to a dumpster", async () => {
        const commentBefore = await commentDAO.getAllForDumpster(1);
        const comment = await commentDAO.addOne({
            dumpsterID: 1,
            nickname: "FreeFood",
            userID: "temp3",
            comment: "I love free food",
        });
        const commentAfter = await commentDAO.getAllForDumpster(1);
        expect(comment).not.toBe(undefined);
        expect(commentAfter.length).toBe(commentBefore.length + 1);
    });
});

describe("updateOne", () => {
    it("should change a comment so the rating is higher", async () => {
        const comment = await commentDAO.changeVote(1, 1);
        const changedComment = await Models.Comments.findOne({
            where: { commentID: 1 },
        });
        expect(changedComment).not.toBe(undefined);
        expect(changedComment?.rating).toEqual(comment?.rating);
        // Expect it to have risen to 6 = 5 + 1
        if (changedComment) expect(changedComment.rating).toBe(6);
    });
    it("should change a comment so the rating is lower", async () => {
        const comment = await commentDAO.changeVote(2, -1);
        const changedComment = await Models.Comments.findOne({
            where: { commentID: 2 },
        });
        expect(changedComment).not.toBe(undefined);
        expect(changedComment?.rating).toEqual(comment?.rating);
        // Expect it to lower to 5 = 6 - 1
        if (changedComment) expect(changedComment.rating).toBe(5);
    });
    it("should be able to result in a negative rating", async () => {
        const comment = await commentDAO.changeVote(4, -1);
        const changedComment = await Models.Comments.findOne({
            where: { commentID: 4 },
        });
        expect(changedComment).not.toBe(undefined);
        expect(changedComment?.rating).toEqual(comment?.rating);
        // Expect it to lower to -1 = 0 - 1
        if (changedComment) expect(changedComment.rating).toBe(-1);
    });
});
