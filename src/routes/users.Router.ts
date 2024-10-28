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
 *                 id:
 *                   type: string
 *                   example: valid-user-id
 *                 name:
 *                   type: string
 *                   example: Test User
 *                 email:
 *                   type: string
 *                   example: testuser@example.com
 *       404:
 *         description: User not found
 */
userRoutes.get('/:userId', GetUser);


export default userRoutes;