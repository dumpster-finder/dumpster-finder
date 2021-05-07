/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         dumpsterID:
 *           type: number
 *         reason:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *       example:
 *         dumpsterID: 2
 *         reason: "It does not exist"
 *         date: "2021-04-27T10:50:33.000Z"
 *     PostReport:
 *       type: object
 *       properties:
 *         reason:
 *           type: string
 *       example:
 *         reason: 'It does not exist'
 * tags:
 *   - name: Reports
 *     description: Reports of nonexistent or otherwise *wrong* dumpsters
 */

import { RouteDependencies } from "../types";
import ReportDAO from "../daos/reports";
import { Request, Router } from "express";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { validate } from "express-validation";
import { getReport, postReport } from "../validators/reports";
import { JwtMiddleware } from "../middleware/tokenMiddleware";
import { ConflictError } from "../types/errors";
import { UniqueConstraintError } from "sequelize";

export default function({ Models }: RouteDependencies) {
    const reportDAO = ReportDAO(Models);
    const router = Router({ mergeParams: true });

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/reports/mine:
     *   get:
     *     summary: GET your report of a dumpster
     *     tags: [Reports]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
     *     responses:
     *       "200":
     *         description: A single report
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Report'
     */
    router.get(
        "/mine",
        standardLimiter,
        JwtMiddleware,
        validate(getReport),
        async (
            req: Request & {
                params: { dumpsterID: number };
            },
            res,
            next,
        ) => {
            try {
                const report = await reportDAO.getOne(
                    req.params.dumpsterID,
                    res.locals.session.id,
                );
                res.status(200).json(report);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/reports:
     *   post:
     *     summary: POST a new report of a dumpster
     *     tags: [Reports]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#components/schemas/PostReport'
     *     responses:
     *       "201":
     *          description: Added a new report
     *       "409":
     *          description: You have already reported this dumpster
     */
    router.post(
        "/",
        updateLimiter,
        JwtMiddleware,
        validate(postReport),
        async (
            req: Request & {
                params: { dumpsterID: number };
            },
            res,
            next,
        ) => {
            try {
                await reportDAO.addOne(
                    req.params.dumpsterID,
                    res.locals.session.id,
                    req.body.reason,
                );
                res.status(201).send(
                    "Report added, thanks for the information",
                );
            } catch (e) {
                if (e instanceof UniqueConstraintError)
                    next(
                        new ConflictError(
                            "You have already reported this dumpster",
                        ),
                    );
                else next(e);
            }
        },
    );
    return router;
}
