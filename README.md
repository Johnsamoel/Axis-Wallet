# Axis Wallet

This application allows users to create accounts, deposit and withdraw funds, and check their account balances.
It features authentication, unit testing, and is structured with a clean architecture using TypeScript, Node.js, PostgreSQL, Prisma, Jest, and Express.

## Technologies Used

- Node.js
- Express
- Prisma (ORM)
- postgress (RDMS)
- swagger (API documentation)
- express-validator (validating data)
- jsonwebtoken (authentication)
- bcrypt (hashing)
- typescript
- jest (unit test)
- supertest (unit test)
- typeScript

## Prerequisites

Make sure you have the following installed:

- **Node.js**
- **PostgreSQL**
- **Docker** (optional, for containerized setup)

  
## How to Run

1. Clone the repository:

```sh
   -> git clone https://github.com/Johnsamoel/Axis-Wallet.git
```

2. install dependencies

```sh
 -> npm install
```

3. modify .env file

```sh
DATABASE_URL= DB_URL
JWT_SECRET= secret

```

4. migrate tables

```sh
-> prisma migrate dev --name init
install prisma cli for migration
```

5. run project

```sh
-> npm run start:dev
```

6. run tests

```sh
-> npm run test
note: You have to create a user in db and start testing. don't forget to modify the "MainFunctionality.test.ts" user before running the test.
```

```javascript
// Example of modifying user credentials in MainFunctionality.test.ts
const user = {
    email: 'your_new_user_email@example.com', // Update with the new user's email
    password: 'your_new_user_password',         // Update with the new user's password
};
```

7. run docs

```sh
after run application open
http://localhost:3000/api-docs
on the browserm swagger ui will open with api documention
```

## Main Entities

- **User**: Each user is allowed to have only one account.
- **Account**: Represents the financial account linked to a user.
- **Transaction**: Every transaction, whether it fails or succeeds, is created and can be retrieved by its ID.

## Docker Setup

If you want to run the application using Docker, you can build the containers with the following command:

```bash
docker compose build
```

## API Documentation

API documentation was created using **Swagger**. You can access the Swagger UI to explore the available endpoints and their usage.










