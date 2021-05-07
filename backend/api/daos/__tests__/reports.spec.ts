import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import ReportDAO from "../reports";
import { UniqueConstraintError } from "sequelize";

const reportsDAO = ReportDAO(Models);

beforeAll(setupTestData);

describe("getOne", () => {
    it("should get the correct report", async () => {
        const report = await reportsDAO.getOne(2, 2);
        expect(report.dumpsterID).toEqual(2);
        expect(report.reason).toEqual("Is illegal");
    });
});

describe("addOne", () => {
    it("should add a new report to the database", async () => {
        await reportsDAO.addOne(7, 2, "It is illegal to dive here");
        const reportResult = await Models.Reports.findOne({
            where: { dumpsterID: 7, userID: 2 },
        });
        expect(reportResult).not.toBeUndefined();
        expect(reportResult?.dumpsterID).toEqual(7);
        expect(reportResult?.userID).toEqual(2);
        expect(reportResult?.reason).toEqual("It is illegal to dive here");
    });
    it("should add a new report to the database with empty string as reason", async () => {
        await reportsDAO.addOne(7, 1, "");
        const resultingReport = await reportsDAO.getOne(7, 1);
        expect(resultingReport.reason).toEqual("");
    });
    it("should not allow adding a report of a dumpster twice as the same user", async () => {
        await reportsDAO.addOne(7, 6, "haha this is fun");
        try {
            await reportsDAO.addOne(
                7,
                6,
                "I wonder if I'll get away with this?",
            );
            fail(
                "It should not be possible to report a dumpster twice as the same user!",
            );
        } catch (e) {
            expect(e).toBeInstanceOf(UniqueConstraintError);
        }
    });
});
