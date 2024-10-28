# Smart Vending Machine

Welcome to the smart vending machine system! This repository contains a Node.js application for a vending machine system.


## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [DB Documentation](#db-documentation)
7. [Notes](#notes)
8. [Enhancements](#enhancements)

## Introduction

This is an application for vending machine system using nodejs, prisma and redis
This application is structured using Repository pattern

## Prerequisites
Install prisma globally `npm i prisma -g`
Once you clone the project, run the following commands

## Installation


```bash
git clone https://github.com/mennaayman94/vending-machine-system.git
cd vending-machine-system
npm install
# Run Prisma generate and migrate commands
npx prisma generate --schema=./src/prisma/schema.prisma
npx prisma migrate dev --schema=./src/prisma/schema.prisma

# Run the database initialization script
node ./scripts/init-db.js
#OR
run local db by providing connection string in DATABASE_URL env variable
# Run the main application
npm run start:dev

#run test
npm test
```

## Usage

You can use any api client such as postman.

## Api Documentation

Kindly check this postman docs link to view my project documentation.

https://documenter.getpostman.com/view/11287645/2sA3kUGhH9

## DB Documentation
1. the database is designed as following:
- Item table that have all the items  
- Cataloge table that have one to many relation with items
- Category table that have one to many relation with items
- User table contains all the users
- Role table that have one to many relation with users table
- Purchase table that contains all the items the purchased
- Payment table contains all the payments received from users

## Notes
1. this application uses cookie session (http only) and save token in it for more secutiry
2. after logging an otp and token is generated 5 min expire time(for both otp token and the otp it self)
3. the access token for the user expires after 1h
4. API for creating catelog, category and roles to test data correctly an there is another option a script that can be run using this commands found in "start.sh" file to create all data inside role, category, catelog and items tables
5. there is a logging file that log all the api calls in "access.log" file 

## Enhancements
- Add idempotency for payment API


