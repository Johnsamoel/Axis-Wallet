
import { loginSchema, registerUserSchema } from "../schemaValidation/validateUser";
import { Login , Register , Logout } from "../Controller/authentication.controller";
import express from 'express';
const authRoutes = express.Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@gmail.com
 *               password:
 *                 type: string
 *                 example: Test@123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: f652db35-38bb-4330-bb4c-d07aa12df509
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-31T21:53:25.876Z"
 *                 name:
 *                   type: string
 *                   example: john
 *                 email:
 *                   type: string
 *                   example: 3333@test.com
 *                 password:
 *                   type: string
 *                   example: "$2b$12$lMn0EQBOYSjEdbSEBOVO9udjTJJH0dhUYBqmH6mrF4qRRcdIRdoSO"
 *       400:
 *         description: Invalid credentials or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request"
 */
authRoutes.post('/login', loginSchema(), Login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: testuser@gmail.com
 *               password:
 *                 type: string
 *                 example: Test@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: f652db35-38bb-4330-bb4c-d07aa12df509
 *                     email:
 *                       type: string
 *                       example: 3333@test.com
 *                     name:
 *                       type: string
 *                       example: john
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-31T21:53:25.876Z"
 *       400:
 *         description: User already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request"
 */
authRoutes.post('/register', registerUserSchema(), Register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request"
 */
authRoutes.post('/logout', Logout);





export default authRoutes;