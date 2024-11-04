import express from "express";
import {authenticateJWT} from "../middleware/auth";
import {createVideo, deleteVideo, getVideo, getVideos, updateVideo} from "../controllers/videos";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management
 * /videos:
 *   get:
 *     summary: Get all videos for a specific user
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user whose videos to fetch
 *         example: 1
 *     responses:
 *       200:
 *         description: List of all videos for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Add a new video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoCreating'
 *     responses:
 *       201:
 *         description: Video added successfully
 *       500:
 *         description: Server error
 *
 * /videos/{id}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Video details
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update a video by ID
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Video ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoUpdating'
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a video by ID
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       500:
 *         description: Server error
 */
router.get('/', authenticateJWT, getVideos);
router.post('/', authenticateJWT, createVideo);
router.get('/:id', authenticateJWT, getVideo);
router.put('/:id', authenticateJWT, updateVideo);
router.delete('/:id', authenticateJWT, deleteVideo);

export default router