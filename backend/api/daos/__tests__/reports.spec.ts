import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import ReportDAO from "../reports";

const reportsDAO = ReportDAO(Models);

beforeAll(setupTestData);

describe("getAllForDumpster", () => {
    it("Should get all reports for given dumpster", async () => {
        const report = await reportsDAO.getAllForDumpster(2);
        expect(report.length).toBe(2);
    });
});

describe("addOne", () => {
    it("Should add a new report to the database", async () => {
        const reportBefore = await reportsDAO.getAllForDumpster(7);
        const report = await reportsDAO.addOne(
            7,
            2,
            "It is illegal to dive here",
        );
        const reportAfter = await reportsDAO.getAllForDumpster(7);
        expect(reportAfter.length).toBe(reportBefore.length + 1);
    });
    it("Should add a new report to the database with empty string as reason", async () => {
        const reportBefore = await reportsDAO.getAllForDumpster(7);
        const report = await reportsDAO.addOne(7, 3, "");
        const reportAfter = await reportsDAO.getAllForDumpster(7);
        expect(reportAfter.length).toBe(reportBefore.length + 1);
    });
});
