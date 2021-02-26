/**
 * @swagger
 * components:
 *   schemas:
 *     Thing:
 *       type: object
 *       required:
 *         - thing
 *       properties:
 *         thing:
 *           type: string
 *           description: Some thing
 *         number:
 *           type: integer
 *           description: A number
 *     Hello:
 *       type: object
 *       required:
 *         - hi
 *       properties:
 *         hi:
 *           type: string
 *           description: there?
 *     Dumpster:
 *       type: object
 *       required:
 *         - hi
 *       properties:
 *         hi:
 *           type: string
 *           description: there?
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
import {Router} from "express";
import {validate} from "express-validation";
import ThingDAO from "../daos/example";
import DumpsterDAO from "../daos/dumpsters"
import {postDumpster} from "../validators/dumpsters";
import {RouteDependencies} from "../types";

//TODO add validation and models, and DAO for the key ones
//TODO change storetype and dumpstertype to String primary key and foreign key
export default function ({ logger, Models }: RouteDependencies) {
    const thingDAO = ThingDAO(Models);
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
         *         description: the greeting
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Dumpster'
         */
        router.get("/", async (req, res) => {
            try {
                const dumpsters = await dumpsterDAO.getAll();
                res.status(200).json(dumpsters);
            } catch (e) {
                logger.error(e, 'Something went wrong!');
                res.status(500).send("uh?");
            }
        });


        /**
         * @swagger
         * /dumpsters/:dumpsterID:
         *   get:
         *     summary: GET Dumpster by tag
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
         *               $ref: '#/components/schemas/dumpsters/:dumpsterID'
         */

    router.get("/dumpsters/:dumpsterID", async (req: {params: {dumpsterID: number}}, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllByDumpsterType(dumpsterID);
            res.status(200).json(dumpsters);

             */

        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });
    /**
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

    router.get("/dumpsters/dumpster-types/:id", async (req: {params: {id: number}}, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllByDumpsterType(id);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });
    /**
     *                          example:
     *                          id:10
     *                          name: Jessica Smith
     */

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
                 *                      type: object
                 *                      properties:
                 *                          position:
                 *                              type: object
                 *                              properties:
                 *                                  latitude:
                 *                                      type: number
                 *                                      minimum: 0
                 *                                      maximum: 90
                 *                                  longitude:
                 *                                      type: number
                 *                                      minimum: 0
                 *                                      maximum: 90
                 *
                 *                          name:
                 *                              type: string
                 *                          type:
                 *                              type: integer
                 *                          storeType:
                 *                              type: integer
                 *                          locked:
                 *                              type: boolean
                 *                          positiveViewOnDiving:
                 *                              type: boolean
                 *                          emptyingSchedule:
                 *                              type: string
                 *                          cleanliness:
                 *                              type: integer
                 *     responses:
                 *       "200":
                 *         description: the greeting
                 *         content:
                 *           application/json:
                 *             schema:
                 *               $ref: '#/components/schemas/dumpsters/'
                 */

            router.post("/dumpsters/", validate(postDumpster), async (req, res) => {
                try {
                    /*
                    const dumpsters = await dumpsterDAO.postOne(postDumpster);
                    res.status(200).json(dumpsters);

                     */
                } catch (e) {
                    logger.error('Something went wrong!', e);
                    res.status(500).send("uh?");
                }
            });
            /**
             * @swagger
             * /dumpsters/:
             *   put:
             *     summary: Update a dumpster
             *     tags: [Dumpsters]
             *     requestBody:
             *          content:
             *              application/json:
             *                 schema:
             *                      type: object
             *                      properties:
             *                          id:
             *                              type: integer
             *                          type:
             *                              type: integer
             *                          storeType:
             *                              type: integer
             *                          locked:
             *                              type: boolean
             *                          positiveViewOnDiving:
             *                              type: boolean
             *                          emptyingSchedule:
             *                              type: string
             *                          cleanliness:
             *                              type: integer
             *     responses:
             *       "200":
             *         description: the greeting
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/dumpsters/'
             */
    router.put("/dumpsters/", validate(postDumpster), async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.putOne(postDumpster);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });
    /**
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
    router.get("/dumpsters/store-types", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllStoreTypes();
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });
    /**
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

    router.get("/dumpsters/dumpster-types", async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.getAllDumpsterTypes();
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
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
    router.post("/dumpsters/tags", validate(postDumpster), async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.postOneTag(postDumpster);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
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
    router.post("/dumpsters/categories", validate(postDumpster), async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.postOneCategory(postDumpster);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
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
    router.delete("/dumpsters/categories/:dumpsterID", async (req: {params: {dumpsterID: number}}, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.deleteAllCategoriesForDumpster(dumpsterID);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });
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
    router.delete("/dumpsters/tags/:dumpsterID", async (req: {params: {dumpsterID: number}}, res) => {
        try {/*
            const dumpsters = await dumpsterDAO.deleteAllTagsForDumpster(dumpsterID);
            res.status(200).json(dumpsters);
            */
        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });
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
            logger.error('Something went wrong!', e);
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
            logger.error('Something went wrong!', e);
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
            logger.error('Something went wrong!', e);
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
    router.post("/dumpsters/categories", validate(postDumpster), async (req, res) => {
        try {
            /*
            const dumpsters = await dumpsterDAO.postOneCategory(postDumpster);
            res.status(200).json(dumpsters);

             */
        } catch (e) {
            logger.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });

return router;
}
