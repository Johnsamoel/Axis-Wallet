// import request from 'supertest';
// import { app } from '../connections'; // Adjust the path to your app
// import { prisma } from '../prisma/client'; // Import your Prisma client
// import { CreateUserService } from '../services/user.Service';
// import { CreateAccountService } from '../services/accounts.Service';

// describe('Account Functionalities', () => {
//   let userId: string;
//   let validToken: string; // Variable to hold the JWT token
//   let accountId: string;

//   beforeAll(async () => {
//     // Create a test user
//     const user = {
//       email: 'testuser@example.com',
//       password: 'Test@123',
//       name: 'Test User',
//     };
//     const userData = await CreateUserService(user);
//     userId = userData.newUser.id;

//     // Create an account for the user
//     accountId = await CreateAccountService({ userId });

//     // Simulate a login to get the JWT token
//     const loginResponse = await request(app)
//       .post('/auth/login') // Adjust the endpoint as necessary
//       .send({ email: user.email, password: user.password });

//     validToken = loginResponse.body.token; // Assuming the token is returned in this format
//   });

//   afterAll(async () => {
//     // Clean up user and account data after tests
//     await prisma.account.deleteMany({ where: { userId } });
//     await prisma.user.deleteMany({ where: { id: userId } });
//   });

//   describe('Create Account', () => {
//     it('should create an account successfully', async () => {
//       const response = await request(app)
//         .post('/accounts/create')
//         .set('Authorization', `Bearer ${validToken}`)
//         .send({ userId });

//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty('message', 'Account created successfully');
//       expect(response.body).toHaveProperty('accountId');
//     });
//   });

//   describe('Deposit into Account', () => {
//     it('should deposit successfully', async () => {
//       const response = await request(app)
//         .post('/accounts/deposit')
//         .set('Authorization', `Bearer ${validToken}`)
//         .send({ accountId, amount: 100 });

//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty('message', 'Transaction created successfully');
//       expect(response.body).toHaveProperty('transactionId');
//     });
//   });

//   describe('Withdraw from Account', () => {
//     it('should withdraw successfully', async () => {
//       await request(app)
//         .post('/accounts/deposit')
//         .set('Authorization', `Bearer ${validToken}`)
//         .send({ accountId, amount: 50 }); // Ensure we have enough balance

//       const response = await request(app)
//         .post('/accounts/withdraw')
//         .set('Authorization', `Bearer ${validToken}`)
//         .send({ accountId, amount: 50 });

//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty('message', 'Transaction created successfully');
//       expect(response.body).toHaveProperty('transactionId');
//     });
//   });

//   describe('Get Account Balance', () => {
//     it('should fetch account balance successfully', async () => {
//       const response = await request(app)
//         .get('/accounts/balance')
//         .set('Authorization', `Bearer ${validToken}`)
//         .send({ userId });

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('message', 'Balance fetched successfully');
//       expect(response.body).toHaveProperty('balance');
//     });
//   });
// });