/**
 * @swagger
 * components:
 *   schemas:
 *     PostReport:
 *       type: object
 *       required:
 *         - userID
 *       properties:
 *         userID:
 *           type: string
 *         reason:
 *           type: string
 *         example:
 *           userID: 'temp1'
 *           reason: 'It does not exist'
 * tags:
 *   - name: Reports
 *     description: Reports API
 */

import { RouteDependencies } from "../types";
import ReportDAO from "../daos/reports";
import { Request, Router } from "express";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { validate } from "express-validation";
import { getReport, postReport } from "../validators/reports";

export default function({ Models }: RouteDependencies) {
    const reportDAO = ReportDAO(Models);
    const router = Router({ mergeParams: true });

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/reports:
     *   get:
     *     summary: GET reports of dumpster
     *     tags: [Reports]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: A list of reports
     */
    router.get(
        "/",
        standardLimiter,
        validate(getReport),
        async (
            req: Request & {
                params: { dumpsterID: number };
            },
            res,
            next,
        ) => {
            try {
                const dumpsters = await reportDAO.getAllForDumpster(
                    req.params.dumpsterID,
                );
                res.status(200).json(dumpsters);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/reports:
     *    post:
     *       summary: POST a new report of a dumpster
     *       tags: [Reports]
     *       parameters:
     *         - in: path
     *           name: dumpsterID
     *           schema:
     *             type: integer
     *           required: true
     *           description: Dumpster ID
     *       requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#components/schemas/PostReport'
     *       responses:
     *          "201":
     *              description: Added a new report
     */
    router.post(
        "/",
        updateLimiter,
        validate(postReport),
        async (
            req: Request & {
                params: { dumpsterID: number };
            },
            res,
            next,
        ) => {
            try {
                const result = await reportDAO.addOne(
                    req.params.dumpsterID,
                    req.body.userID,
                    req.body.reason,
                );
                res.status(201).json(result);
            } catch (e) {
                next(e);
            }
        },
    );
    return router;
}
