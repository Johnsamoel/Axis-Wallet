import { NextFunction } from 'express';
import { CreateAccount, DepositeAccount, WithdrawAccount } from './../utils/types/Account';
import { prisma } from "../prisma/client";
import { AccountStatus } from "../utils/enums/AccountStatus";
import { TransactionStatus , TransactionTypes } from "../utils/enums/TransactionsStatus";
import {  createTransaction } from './transactions.Repo';
import CustomError from '../classes/CustomError';
import { PrismaClient } from '@prisma/client';


// create user
const createAccountRepo = async ({ userId }: CreateAccount) => {
  console.log("------repository:createUser---------");

  try {
    // Fetch user by UUID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new CustomError("Bad Request" , 400);
    }

    // Check if the user already has an account

    const userAccount = await prisma.account.findUnique({
      where: {
        userId: userId,
      },
    });

    if(userAccount) {
      throw new CustomError("User already have an account" , 409);
    }

    const account = await prisma.account.create({
      data: {
        userId: userId,
        balance: 0,
        status: AccountStatus.ACTIVE,
      },
    });

    if (!account) {
      throw new  CustomError("Something went wrong" , 501);
    } else {
      return account.id;
    }
  } catch (error: CustomError | any) {
    if(error.message && error.code) {
      throw new CustomError(error.message, error.code)
    }else {
      throw new Error("Something went wrong");
    }

  }
};

// get Account 
const getAccount = async (accountId: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new CustomError("Account not found!" , 400);
    }

    return account;
  } catch (error) {
    throw error
  }
}

// get Account by userId
const getAccountByUserIdRepo = async (userId: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: { userId: userId },
    });

    if (!account) {
      throw new CustomError("Account not found or you do not have one" , 400);
    }

    return account;
  } catch (error: CustomError | any) {
    if(error.message && error.code) {
      throw new CustomError(error.message, error.code)
    }else{
      throw error
    }
  }
}

// deposite money
const depositeAccountRepo = async ({ accountId, amount }: DepositeAccount) => {
    try {
      // Run the operations inside a transaction to ensure atomicity
      const result = await prisma.$transaction(async (prisma: any) => {
        // Retrieve both accounts within the transaction
        const account = await  getAccount(accountId)
       
        console.log(account , 'account');
        // Validate  account existence
        if (!account) {
          throw new CustomError("Bad Request" , 400); 
        }
        
        // Validate  account status
        if(account.status === AccountStatus.INACTIVE){
          throw new CustomError("Account is inactive" , 409);
         }
   

        // Update user's balance (add the amount)
        const updateUserBalance = await prisma.account.update({
          where: { id: accountId },
          data: { balance: account.balance + amount },
        });

        // Create a transaction record for the deposit
        const transaction = await createTransaction({
          accountId: accountId,
          amount: amount,
          type: TransactionTypes.DEPOSITE,
          status: TransactionStatus.SUCCEEDED,
        });


        return transaction.id

      });
  
      return result;
  
    } catch (error) {

      // Create failed transaction record for the deposit
      const transaction = await createTransaction({
        amount: amount,
        type: TransactionTypes.DEPOSITE,
        status: TransactionStatus.FAILED,
        accountId: accountId
      });

      throw new Error(`Transaction failed. Please try again.
         Here's the failed transaction id:  ${transaction.id} `
        );
    }
};

// withdraw money
const WithdrawAccountRepo = async ({ accountId, amount }: DepositeAccount) => {
  try {
    // Run the operations inside a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma: any) => {
      // Retrieve both accounts within the transaction
      const account = await  getAccount(accountId)
     

      // Validate  account existence
      if (!account) {
        throw new CustomError("Bad Request" , 400); 
      }

      if(account.balance < amount){
        throw new CustomError("Insufficient balance" , 400);
      }

      if(account.status === AccountStatus.INACTIVE){
       throw new CustomError("Account is inactive" , 409);
      }

      // Update user's balance (add the amount)
      const updateUserBalance = await prisma.account.update({
        where: { id: accountId },
        data: { balance: account.balance - amount },
      });

      // Create a transaction record for the deposit
      const transaction = await createTransaction({
        accountId: accountId,
        amount: amount,
        type: TransactionTypes.WITHDRAW,
        status: TransactionStatus.SUCCEEDED,
      });


      return transaction.id

    });

    return result;

  } catch (error) {

    // Create failed transaction record for the deposit
    const transaction = await createTransaction({
      amount: amount,
      type: TransactionTypes.WITHDRAW,
      status: TransactionStatus.FAILED,
      accountId: accountId
    });

    throw new Error(`Transaction failed. Here's the failed transaction id: ${transaction.id} `);
  }
};

  

export { createAccountRepo , depositeAccountRepo , WithdrawAccountRepo , getAccountByUserIdRepo  };
