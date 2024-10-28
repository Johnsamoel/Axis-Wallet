import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4  , validate} from 'uuid';
import { CreateAccountService , DepositeIntoAccountService , WithdrawAccountService , getAccountService } from '../services/accounts.Service';
import { validationResult } from 'express-validator';
import CustomError from '../classes/CustomError';

const CreateAccountController = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req?.userId 
  
      // Validate UUID format
      if (!validate(userId)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const accountId = await CreateAccountService({userId});

      if(!accountId) {
        res.status(400).json({message: 'Something went wrong'});
      }

      res.status(201).json({message: 'Account created successfully', accountId: accountId}); 
  
     
    } catch (error : CustomError | any) {
      if(error.code == 400 || error.code == 501 || error.code == 409) {
        return res.status(error.code).json({ message: error.message });
      }else{
        next(new Error('something went wrong'));
      }
    }
};

const DepositeAccountController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req?.userId 
    const amount = req.body.amount;

    // Validate UUID format
    if (!validate(userId)) {
      return res.status(404).json({ message: 'Invalid ID' });
    }

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }


    const userAccount = await getAccountService(userId);

    if(!userAccount) {
      return res.status(404).json({ message: 'Account was not found ' });
    }

    const transactionId = await DepositeIntoAccountService({accountId: userAccount.id , amount});
   
    if(!transactionId) {
      res.status(400).json({message: 'Something went wrong'});
    }

    res.status(201).json({message: 'Transaction created successfully' , transactionId: transactionId}); 

   
  } catch (error: CustomError | any) {
    if(error.code &&  error.message) {
      return res.status(error.code).json({ message: error.message });
    }else{
      next(error);
    }
  }
};

const withdrawAccountController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req?.userId 
    const amount = req.body.amount;

    // Validate UUID format
    if (!validate(userId)) {
      return res.status(404).json({ message: 'Invalid ID' });
    }

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }


    const userAccount = await getAccountService(userId);

    if(!userAccount) {
      return res.status(404).json({ message: 'Account was not found' });
    }

    const transactionId = await WithdrawAccountService({accountId: userAccount.id , amount});
   
    if(!transactionId) {
      res.status(400).json({message: 'Something went wrong'});
    }

    res.status(201).json({message: 'Transaction created successfully' , transactionId: transactionId}); 

   
  } catch (error: CustomError | any) {
    if(error.code &&  error.message) {
      return res.status(error.code).json({ message: error.message });
    }else{
      next(error);
    }
    next(error);
  }
};
  
const getAccountBalanceController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req?.userId 

    // Validate UUID format
    if (!validate(userId)) {
      return res.status(404).json({ message: 'Invalid ID' });
    }

    const userAccount = await getAccountService(userId);

    if(!userAccount) {
      return res.status(404).json({ message: 'Account was not found ' });
    }

    const balance = userAccount.balance;
   
    res.status(200).json({message: 'Balance fetched successfully' , balance: balance}); 

   
  } catch (error: CustomError | any) {
    console.log(error , 'error it self');
    if(error.code == 400) {
      return res.status(error.code).json({ message: error.message });
    }else{
      next(new Error('something went wrong'));
    }
  
  }
}

export {
  CreateAccountController,
  DepositeAccountController,
  withdrawAccountController,
  getAccountBalanceController
};
