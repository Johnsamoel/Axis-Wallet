import {GetUser} from '../Controller/users.controller'
import express from 'express';
const userRoutes = express.Router();


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *           example: valid-user-id
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: f652db35-38bb-4330-bb4c-d07aa12df509
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-31T21:53:25.876Z"
 *                     name:
 *                       type: string
 *                       example: john
 *                     email:
 *                       type: string
 *                       example: 3333@test.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
userRoutes.get('/:userId', GetUser);


export default userRoutes;