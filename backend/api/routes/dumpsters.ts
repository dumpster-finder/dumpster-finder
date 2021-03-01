/**
 * @swagger
 * components:
 *     schemas:
 *         Message:
 *             type: object
 *             properties:
 *                 statusCode:
 *                     type: number
 *                     description: The HTTP status code of the response
 *                 message:
 *                     type: string
 *                     description: A message describing what went wrong
 *             example:
 *                 statusCode: 404
 *                 message: "Not found"
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
 *                     type: object
 *                     properties:
 *                         latitude:
 *                             type: number
 *                             minimum: -90
 *                             maximum: 90
 *                         longitude:
 *                             type: number
 *                             minimum: -180
 *                             maximum: 180
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
 *             example:
 *                 name: "Some Store"
 *                 position:
 *                     latitude: 63.422407
 *                     longitude: 10.394954
 *                 dumpsterType: "Compressor"
 *                 storeType: "Electronics"
 *                 locked: true
 *                 positiveStoreViewOnDiving: false
 *                 emptyingSchedule: "Every Saturday"
 *                 cleanliness: 2
 *         Dumpster:
 *             allOf:
 *                 - type: object
 *                   required:
 *                     - dumpsterID
 *                   properties:
 *                     dumpsterID:
 *                       type: number
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
 *                 storeType: "Electronics"
 *                 locked: true
 *                 positiveStoreViewOnDiving: false
 *                 emptyingSchedule: "Every Saturday"
 *                 cleanliness: 2
 *                 rating: 2.7
 */

/**
 * @swagger
 * tags:
 *   - name: Dumpsters
 *     description: Dumpster API
 *   - name: Categories
 *     description: categories API
 *   - name: Tags
 *     description: Dumpster API
 */

import { Router } from "express";
import { validate } from "express-validation";
import DumpsterDAO from "../daos/dumpsters";
import { postDumpster } from "../validators/dumpsters";
import { RouteDependencies } from "../types";

//TODO add validation and models, and DAO for the key ones
//TODO change storetype and dumpstertype to String primary key and foreign key
//     (really?)
export default function ({ logger, Models }: RouteDependencies) {
    const router = Router();
    const dumpsterDAO = DumpsterDAO(Models);

    /**
     * @swagger
     * /dumpsters/:
     *   get:
     *     summary: GET all dumpsters
     *     tags: [Dumpsters]
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
    router.get("/", async (req, res, next) => {
        try {
            const dumpsters = await dumpsterDAO.getAll();
            res.status(200).json(dumpsters);
        } catch (e) {
            logger.error(e, "Something went wrong!");
            next(e);
        }
    });

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
        async (req: { params: { dumpsterID: number } }, res, next) => {
            try {
                const dumpster = await dumpsterDAO.getOne(
                    req.params.dumpsterID,
                );
                if (dumpster) {
                    res.status(200).json(dumpster);
                } else {
                    res.status(404).json({statusCode: 404, message: "Dumpster not found"});
                }
            } catch (e) {
                logger.error(e, "Something went wrong!");
                next(e);
            }
        },
    );

    /**
     * TODO decide if this can be removed or not
     * @swagger
     * /dumpsters/dumpster-types/:id:
     *   get:
     *     summary: GET Dumpster by dumpster Type
     *     tags: [Dumpsters]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster-Type ID
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/dumpster-types/:id'
     */
    router.get(
        "/dumpsters/dumpster-types/:id",
        async (req: { params: { id: number } }, res) => {
            try {
                /*
            const dumpsters = await dumpsterDAO.getAllByDumpsterType(id);
            res.status(200).json(dumpsters);

             */
            } catch (e) {
                logger.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/:
     *   post:
     *     summary: Post a new dumpster
     *     tags: [Dumpsters]
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
    router.post("/", validate(postDumpster), async (req, res, next) => {
        try {
            const result = await dumpsterDAO.addOne(req.body);
            res.status(201).json(result);
        } catch (e) {
            logger.error(e, "Something went wrong!");
            next(e); // Pass to Express error handler
        }
    });

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
        validate(postDumpster),
        async (req, res, next) => {
            try {
                const result = await dumpsterDAO.updateOne({
                    dumpsterID: req.params.dumpsterID,
                    ...req.body,
                });
                res.status(200).json(result);
            } catch (e) {
                logger.error(e, "Something went wrong!");
                next(e);
            }
        },
    );

    /**
     * TODO move?
     * @swagger
     * /dumpsters/store-types:
     *   get:
     *     summary: GET all store-types
     *     tags: [Dumpsters]
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/store-types'
     */
    router.get("/store-types", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllStoreTypes();
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });
    /**
     * TODO move?
     * @swagger
     * /dumpsters/dumpster-types:
     *   get:
     *     summary: GET all dumpster-types
     *     tags: [Dumpsters]
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/dumpster-types'
     */

    router.get("/dumpster-types", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllDumpsterTypes();
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /dumpsters/tags:
     *   post:
     *     summary: add a new tag for a dumpster
     *     tags: [Dumpsters]
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                      type: object
     *                      properties:
     *                          dumpsterid:
     *                              type: integer
     *                          tagid:
     *                              type: integer
     *                          amount:
     *                              type: string
     *                          unit:
     *                              type: integer
     *                          quality:
     *                              type: integer
     *                          foundDate:
     *                              type: string
     *                              format: date
     *                          expiryDate:
     *                              type: string
     *                              format: date
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/tags'
     */
    router.post("/tags", validate(postDumpster), async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.postOneTag(postDumpster);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /dumpsters/categories:
     *   post:
     *     summary: add a new category for a dumpster
     *     tags: [Dumpsters]
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                      type: object
     *                      properties:
     *                          dumpsterid:
     *                              type: integer
     *                          categoryid:
     *                              type: integer
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/categories'
     */
    router.post("/categories", validate(postDumpster), async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.postOneCategory(postDumpster);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /dumpsters/categories/:dumpsterID:
     *   delete:
     *     summary: delete all categories for a Dumpster
     *     tags: [Dumpsters]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/categories/:dumpsterID'
     */
    router.delete(
        "/dumpsters/categories/:dumpsterID",
        async (req: { params: { dumpsterID: number } }, res) => {
            try {
                /*
            const dumpsters = await dumpsterDAO.deleteAllCategoriesForDumpster(dumpsterID);
            res.status(200).json(dumpsters);

             */
            } catch (e) {
                logger.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );
    /**
     * @swagger
     * /dumpsters/tags/:dumpsterID:
     *   delete:
     *     summary: delete all tags for a Dumpster
     *     tags: [Dumpsters]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/tags/:dumpsterID'
     */
    router.delete(
        "/dumpsters/tags/:dumpsterID",
        async (req: { params: { dumpsterID: number } }, res) => {
            try {
                /*
            const dumpsters = await dumpsterDAO.deleteAllTagsForDumpster(dumpsterID);
            res.status(200).json(dumpsters);
            */
            } catch (e) {
                logger.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );
    /**
     * @swagger
     * /categories/:
     *   get:
     *     summary: GET all categories
     *     tags: [Categories]
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/categories'
     */
    router.get("/categories", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllCategories();
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /tags/:
     *   get:
     *     summary: GET all tags
     *     tags: [Tags]
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/tags'
     */
    router.get("/tags", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllTags();
            res.status(200).json(dumpsters);
             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /tags/standard:
     *   get:
     *     summary: GET all standard tags
     *     tags: [Tags]
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/tags'
     */
    router.get("/tags", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllStandardTags();
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });
    /**
     * @swagger
     * /tags/:
     *   post:
     *     summary: add a new tag
     *     tags: [Tags]
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                      type: object
     *                      properties:
     *                          categoryid:
     *                              type: integer
     *                          name:
     *                              type: string
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/dumpsters/categories'
     */
    router.post(
        "/dumpsters/categories",
        validate(postDumpster),
        async (req, res) => {
            try {
                /*
            const dumpsters = await dumpsterDAO.postOneCategory(postDumpster);
            res.status(200).json(dumpsters);

             */
            } catch (e) {
                logger.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );

    return router;
}
