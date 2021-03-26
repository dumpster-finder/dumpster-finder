/**
 * @swagger
 * components:
 *     schemas:
 *         DumpsterType:
 *             type: object
 *             properties:
 *                 dumpsterTypeID:
 *                     type: integer
 *                     description: ID of this dumpster type
 *                 name:
 *                     type: string
 *                     description: The name of the dumpster type
 *             example:
 *                 categoryID: 666
 *                 name: "Devil's Trash Can"
 * tags:
 *   - name: DumpsterTypes
 *     description: Dumpster type API
 */

import { RouteDependencies } from "../types";
import { Router } from "express";
import DumpsterTypeDAO from "../daos/dumpsterTypes";
import { standardLimiter } from "../middleware/rateLimiter";

export default function ({ Models }: RouteDependencies) {
    const router = Router();
    const dumpsterTypeDAO = DumpsterTypeDAO(Models);

    /**
     * @swagger
     * /dumpster-types/:
     *   get:
     *     summary: GET all dumpster types
     *     tags: [DumpsterTypes]
     *     responses:
     *       "200":
     *         description: A list of all dumpster types
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/DumpsterType'
     */
    router.get("/", standardLimiter, async (req, res) => {
        const dumpsterTypes = await dumpsterTypeDAO.getAll();
        res.status(200).json(dumpsterTypes);
    });

    return router;
}
