# Fintech Application

Welcome to the Fintech Application!
This repository contains a TypeScript-based Node.js application for managing user accounts and transactions.

Table of Contents

1. Introduction
2. Main Entities
3. Prerequisites
4. Installation
5. Docker Setup
6. API Documentation
7. Running Unit Tests
8. Notes
9. Enhancements

Introduction

This application allows users to create accounts, deposit and withdraw funds, and check their account balances. It features authentication, unit testing, and is structured with a clean architecture using TypeScript, Node.js, PostgreSQL, Prisma, Jest, and Express.

Main Entities

- User: Each user is allowed to have only one account.
- Account: Represents the financial account linked to a user.
- Transaction: Every transaction, whether it fails or succeeds, is created and can be retrieved by its ID.

Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL
- Docker (optional, for containerized setup)

Installation

Once you clone the project, run the following commands:

git clone https://github.com/yourusername/fintech-app.git
cd fintech-app
npm install

Run Prisma generate and migrate commands
npx prisma generate
npx prisma migrate dev

Run local db by providing the connection string in DATABASE_URL env variable

Run the main application
npm run start:dev

Run tests
npm test

Docker Setup

If you want to run the application using Docker, you can build the containers with the following command:

docker compose build

API Documentation

API documentation was created using Swagger. You can access the Swagger UI to explore the available endpoints and their usage.

Running Unit Tests

Before running the unit tests, you need to create a user in the database. After creating the user, modify the user email and password in MainFunctionality.test.ts to match the credentials of the newly created user. Otherwise, the tests will fail.

Example of modifying user credentials in MainFunctionality.test.ts
const user = {
    email: 'your_new_user_email@example.com', // Update with the new user's email
    password: 'your_new_user_password',         // Update with the new user's password
};