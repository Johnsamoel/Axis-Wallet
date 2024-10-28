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
 *                   example: Balance fetched successfully
 *                 balance:
 *                   type: number
 *                   example: 100.50
 *       404:
 *         description: Account not found
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: valid-user-id
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
 *                   example: Account created successfully
 *                 accountId:
 *                   type: string
 *                   example: new-account-id
 *       400:
 *         description: Invalid user ID or account creation failed
 */
accountsRoutes.post('/create', CreateAccountController);

/**
 * @swagger
 * /accounts/deposite:
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
 *               userId:
 *                 type: string
 *                 example: valid-user-id
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
 *                   example: Transaction created successfully
 *                 transactionId:
 *                   type: string
 *                   example: transaction-id
 *       404:
 *         description: Account not found
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
 *               userId:
 *                 type: string
 *                 example: valid-user-id
 *               amount:
 *                 type: number
 *                 example: 50
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
 *                   example: Transaction created successfully
 *                 transactionId:
 *                   type: string
 *                   example: transaction-id
 *       404:
 *         description: Account not found
 *       400:
 *         description: Insufficient balance
 */
accountsRoutes.post('/withdraw', AccountTransactionSchema(), withdrawAccountController);




export default accountsRoutes;