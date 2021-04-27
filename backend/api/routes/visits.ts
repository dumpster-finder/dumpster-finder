/**
 * @swagger
 * components:
 *   schemas:
 * tags:
 *   - name: Visits
 *     description: Keeps track of how many times each dumpster has been visited
 */
import { Request, Router } from "express";
import VisitDAO from "../daos/visits";
import { validate } from "express-validation";
import { RouteDependencies } from "../types";
import { postVisit } from "../validators/visits";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { JwtMiddleware } from "../middleware/tokenMiddleware";

export default function ({ Models }: RouteDependencies) {
    const visitDAO = VisitDAO(Models);
    const router = Router({ mergeParams: true });

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/visits:
     *    post:
     *       summary: POST a new visit to the database
     *       tags: [Visits]
     *       parameters:
     *         - in: path
     *           name: dumpsterID
     *           schema:
     *             type: integer
     *           required: true
     *           description: Dumpster ID
     *         - in: header
     *           name: x-access-token
     *           schema:
     *             type: string
     *           format: uuid
     *           required: true
     *           description: JWT for authentication
     *       responses:
     *          "201":
     *              description: Added a new visit
     */
    router.post(
        "/",
        updateLimiter,
        JwtMiddleware,
        validate(postVisit),
        async (
            req: Request & {
                params: { dumpsterID: number };
            },
            res,
            next,
        ) => {
            try {
                const result = await visitDAO.addOne(
                    req.params.dumpsterID,
                    res.locals.session.id,
                );
                res.status(201).json(result);
            } catch (e) {
                next(e);
            }
        },
    );
    return router;
}
