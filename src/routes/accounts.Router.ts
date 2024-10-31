import {CreateAccountController , DepositeAccountController , getAccountBalanceController , withdrawAccountController} from '../Controller/accounts.controller';
import {AccountTransactionSchema} from '../schemaValidation/validateAccount'
import express from 'express';
const accountsRoutes = express.Router();


/**
 * @swagger
 * /accounts/getbalance:
 *   get:
 *     summary: Retrieve the account balance
 *     tags: [Accounts]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully retrieved account balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Balance fetched successfully"
 *                 balance:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: Bad request or account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Balance fetched successfully"
 *                 balance:
 *                   type: number
 *                   example: 0
 */

accountsRoutes.get('/getbalance', getAccountBalanceController);

/**
 * @swagger
 * /accounts/create:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account created successfully"
 *                 accountId:
 *                   type: string
 *                   example: "f9d8affc-b0f7-4031-af6e-2f12a048a1f9"
 *       409:
 *         description: User already has an account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already have an account"
 */
accountsRoutes.post('/create', CreateAccountController);

/**
 * @swagger
 * /accounts/deposit:
 *   post:
 *     summary: Deposit money into the account
 *     tags: [Accounts]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction created successfully"
 *                 transactionId:
 *                   type: string
 *                   example: "857e035f-99e4-4fb4-88fc-87f23b660716"
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account not found or you do not have one"
 *       422:
 *         description: Invalid amount
 */
accountsRoutes.post('/deposite', AccountTransactionSchema(), DepositeAccountController);

/**
 * @swagger
 * /accounts/withdraw:
 *   post:
 *     summary: Withdraw money from the account
 *     tags: [Accounts]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5.25
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction created successfully"
 *                 transactionId:
 *                   type: string
 *                   example: "56c37948-45ca-4a8c-8b4d-e42fc36c13c7"
 *       404:
 *         description: Account not found
 *       400:
 *         description: Insufficient balance
 *       500:
 *         description: Transaction failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction failed. Here's the failed transaction id: 09571750-1c9e-49d9-9b0e-f17e71de82b2"
 */
accountsRoutes.post('/withdraw', AccountTransactionSchema(), withdrawAccountController);




export default accountsRoutes;