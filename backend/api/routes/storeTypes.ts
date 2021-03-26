/**
 * @swagger
 * components:
 *     schemas:
 *         StoreType:
 *             type: object
 *             properties:
 *                 storeTypeID:
 *                     type: integer
 *                     description: ID of this store type
 *                 name:
 *                     type: string
 *                     description: The name of the store type
 *             example:
 *                 categoryID: 69
 *                 name: "Unspeakable Store"
 * tags:
 *   - name: StoreTypes
 *     description: Store type API
 */

import { RouteDependencies } from "../types";
import { Router } from "express";
import StoreTypeDAO from "../daos/storeTypes";
import { standardLimiter } from "../middleware/rateLimiter";

export default function ({ Models }: RouteDependencies) {
    const router = Router();
    const storeTypeDAO = StoreTypeDAO(Models);

    /**
     * @swagger
     * /store-types/:
     *   get:
     *     summary: GET all store types
     *     tags: [StoreTypes]
     *     responses:
     *       "200":
     *         description: A list of all store types
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/StoreType'
     */
    router.get("/", standardLimiter, async (req, res) => {
        const storeTypes = await storeTypeDAO.getAll();
        res.status(200).json(storeTypes);
    });

    return router;
}
