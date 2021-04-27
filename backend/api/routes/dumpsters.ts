/**
 * @swagger
 * components:
 *     schemas:
 *         Message:
 *             type: object
 *             properties:
 *                 statusCode:
 *                     type: integer
 *                     description: The HTTP status code of the response
 *                 message:
 *                     type: string
 *                     description: A message describing what went wrong
 *             example:
 *                 statusCode: 404
 *                 message: "Not found"
 *
 *         latitude:
 *             type: number
 *             minimum: -90
 *             maximum: 90
 *         longitude:
 *             type: number
 *             minimum: -180
 *             maximum: 180
 *
 *         Position:
 *             type: object
 *             required:
 *                 - latitude
 *                 - longitude
 *             properties:
 *                 latitude:
 *                     $ref: '#/components/schemas/latitude'
 *                 longitude:
 *                     $ref: '#/components/schemas/longitude'
 *             example:
 *                 latitude: 63.422407
 *                 longitude: 10.394954
 *
 *         LocationParams:
 *             allOf:
 *                 - $ref: '#/components/schemas/Position'
 *                 - type: object
 *                   required:
 *                       - position
 *                   properties:
 *                       radius:
 *                           type: number
 *                           description: Radius around the given position
 *             example:
 *                 latitude: 63.422407
 *                 longitude: 10.394954
 *                 radius: 6000
 *                 visitSinceDate: "2021-01-01"
 *
 *         PostDumpster:
 *             type: object
 *             required:
 *                 - name
 *                 - position
 *                 - dumpsterType
 *                 - storeType
 *                 - locked
 *                 - emptyingSchedule
 *                 - cleanliness
 *             properties:
 *                 position:
 *                     $ref: '#/components/schemas/Position'
 *                 name:
 *                     type: string
 *                 dumpsterType:
 *                     type: string
 *                 storeType:
 *                     type: string
 *                 locked:
 *                     type: boolean
 *                 positiveStoreViewOnDiving:
 *                     type: boolean
 *                 emptyingSchedule:
 *                     type: string
 *                 cleanliness:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                 info:
 *                     type: string
 *                 categories:
 *                     type: array
 *                     items:
 *                        type: string
 *             example:
 *                 name: "Some Store"
 *                 position:
 *                     latitude: 63.422407
 *                     longitude: 10.394954
 *                 dumpsterType: "Compressor"
 *                 storeType: "Electronics Store"
 *                 categories: ["Batteries"]
 *                 locked: true
 *                 positiveStoreViewOnDiving: false
 *                 emptyingSchedule: "Every Saturday"
 *                 cleanliness: 2
 *                 info: "This dumpster can pack a lot of circuits"
 *
 *         Dumpster:
 *             allOf:
 *                 - type: object
 *                   required:
 *                     - dumpsterID
 *                   properties:
 *                     dumpsterID:
 *                       type: integer
 *                 - $ref: '#/components/schemas/PostDumpster'
 *                 - type: object
 *                   required:
 *                     - rating
 *                   properties:
 *                     rating:
 *                       type: number
 *             example:
 *                 dumpsterID: 42
 *                 name: "Some Store"
 *                 position:
 *                     latitude: 63.422407
 *                     longitude: 10.394954
 *                 dumpsterType: "Compressor"
 *                 storeType: "Electronics Store"
 *                 categories: ["Batteries"]
 *                 locked: true
 *                 positiveStoreViewOnDiving: false
 *                 emptyingSchedule: "Every Saturday"
 *                 cleanliness: 2
 *                 info: "This dumpster can pack a lot of circuits"
 *                 rating: 2.7
 *
 *         DumpsterRevision:
 *             allOf:
 *                 - type: object
 *                   required:
 *                     - dumpsterID
 *                     - revisionID
 *                   properties:
 *                     dumpsterID:
 *                       type: integer
 *                     revisionID:
 *                       type: integer
 *                 - $ref: '#/components/schemas/PostDumpster'
 *                 - type: object
 *                   required:
 *                     - dateUpdated
 *                     - isActive
 *                   properties:
 *                     dateUpdated:
 *                       type: string
 *                       format: date
 *                     isActive:
 *                       type: boolean
 *             example:
 *                 dumpsterID: 42
 *                 revisionID: 354
 *                 name: "Some Store"
 *                 position:
 *                     latitude: 63.422407
 *                     longitude: 10.394954
 *                 dumpsterType: "Compressor"
 *                 storeType: "Electronics Store"
 *                 categories: ["Batteries"]
 *                 locked: true
 *                 positiveStoreViewOnDiving: false
 *                 emptyingSchedule: "Every Saturday"
 *                 cleanliness: 2
 *                 info: "This dumpster can pack a lot of circuits"
 *                 dateUpdated: "2021-01-30"
 *                 isActive: true
 *
 * tags:
 *   - name: Dumpsters
 *     description: Data about things that contain trash
 *   - name: Revisions
 *     description: Edit history of dumpsters
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import DumpsterDAO from "../daos/dumpsters";
import {
    getDumpster,
    getRevisions,
    locationParams,
    patchRevision,
    postDumpster,
    putDumpster,
} from "../validators/dumpsters";
import { RouteDependencies } from "../types";
import { PositionParams } from "../types/Position";
import { updateLimiter, standardLimiter } from "../middleware/rateLimiter";
import { NotFoundError } from "../types/errors";
import { JwtMiddleware } from "../middleware/tokenMiddleware";

export default function ({ Models }: RouteDependencies) {
    const router = Router();
    const dumpsterDAO = DumpsterDAO(Models);

    /**
     * @swagger
     * /dumpsters/:
     *   get:
     *     summary: GET all dumpsters
     *     tags: [Dumpsters]
     *     parameters:
     *       - in: query
     *         name: values
     *         schema:
     *           $ref: '#/components/schemas/LocationParams'
     *         required: true
     *         style: form
     *         explode: true
     *         description: Position and radius around it
     *     responses:
     *       "200":
     *         description: An array of dumpsters
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                   $ref: '#/components/schemas/Dumpster'
     */
    router.get(
        "/",
        standardLimiter,
        validate(locationParams),
        async (req: Request & { query: PositionParams }, res, next) => {
            try {
                const dumpsters = await dumpsterDAO.getAll(req.query);
                res.status(200).json(dumpsters);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}:
     *   get:
     *     summary: GET Dumpster by ID
     *     tags: [Dumpsters]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: query
     *         name: values
     *         schema:
     *           type: object
     *           required:
     *             - visitSinceDate
     *           properties:
     *             visitSinceDate:
     *               type: string
     *               format: date
     *               description: Date to count visits from
     *           example:
     *             visitSinceDate: "2021-01-01"
     *         required: true
     *         style: form
     *         explode: true
     *     responses:
     *       "200":
     *         description: The requested dumpster
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dumpster'
     *       "404":
     *         description: Not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Message'
     */
    router.get(
        "/:dumpsterID(\\d+)",
        standardLimiter,
        validate(getDumpster),
        async (
            req: Request & { query: { visitSinceDate: string } },
            res,
            next,
        ) => {
            try {
                const dumpster = await dumpsterDAO.getOne(
                    parseInt(req.params.dumpsterID),
                    req.query.visitSinceDate,
                );
                if (dumpster) {
                    res.status(200).json(dumpster);
                } else {
                    // TODO consider moving this down into the DAO
                    throw new NotFoundError("Dumpster not found");
                }
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/:
     *   post:
     *     summary: Post a new dumpster
     *     tags: [Dumpsters]
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                   $ref: '#/components/schemas/PostDumpster'
     *     responses:
     *       "201":
     *         description: The new dumpster, with ID and all
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dumpster'
     */
    router.post(
        "/",
        updateLimiter,
        JwtMiddleware,
        validate(postDumpster),
        async (req, res, next) => {
            try {
                const result = await dumpsterDAO.addOne(req.body);
                res.status(201).json(result);
            } catch (e) {
                next(e); // Pass to Express error handler
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/:
     *   put:
     *     summary: Update a dumpster
     *     tags: [Dumpsters]
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
     *          content:
     *              application/json:
     *                 schema:
     *                    $ref: '#/components/schemas/PostDumpster'
     *     responses:
     *       "200":
     *         description: The resulting dumpster
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dumpster'
     */
    router.put(
        "/:dumpsterID(\\d+)",
        updateLimiter,
        JwtMiddleware,
        validate(putDumpster),
        async (req, res, next) => {
            try {
                const result = await dumpsterDAO.updateOne({
                    dumpsterID: parseInt(req.params.dumpsterID),
                    ...req.body,
                });
                res.status(200).json(result);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/revisions:
     *   get:
     *     summary: GET all revisions of a dumpster
     *     tags: [Revisions]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: An array of dumpster revisions
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                   $ref: '#/components/schemas/DumpsterRevision'
     */
    router.get(
        "/:dumpsterID(\\d+)/revisions",
        standardLimiter,
        validate(getRevisions),
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const revision = await dumpsterDAO.getRevisions(
                    req.params.dumpsterID,
                );
                res.status(200).json(revision);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/revisions:
     *   patch:
     *     summary: Revert to an earlier revision
     *     tags: [Revisions]
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
     *          content:
     *              application/json:
     *                 schema:
     *                   type: object
     *                   required:
     *                     - revisionID
     *                   properties:
     *                     revisionID:
     *                       type: integer
     *     responses:
     *       "204":
     *         description: Successfully reverted
     */
    router.patch(
        "/:dumpsterID(\\d+)/revisions",
        updateLimiter,
        JwtMiddleware,
        validate(patchRevision),
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                await dumpsterDAO.setActiveRevision(
                    req.params.dumpsterID,
                    req.body.revisionID,
                );
                res.status(204).send();
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
