import { WithdrawAccount } from './../utils/types/Account';
import { CreateAccount , DepositeAccount } from "../utils/types/Account";
import { createAccountRepo , depositeAccountRepo , WithdrawAccountRepo , getAccountByUserIdRepo  } from "../repositories/accounts.Repo";
import CustomError from '../classes/CustomError';

export const CreateAccountService = async ({ userId }: CreateAccount) => {
  console.log("------service:CreateUserService---------");

  try {
    return await createAccountRepo({ userId });
  } catch (error) {
    throw error;
  }
};

// deposite into account
export const DepositeIntoAccountService = async ({ accountId , amount }: DepositeAccount) => {
  console.log("------service:DepositeIntoAccountService---------");

  try {
    return await depositeAccountRepo({ accountId , amount });
  } catch (error) {
    throw error
  }
};

// deposite into account
export const WithdrawAccountService = async ({ accountId , amount }: DepositeAccount) => {
  console.log("------service:WithdrawAccountService---------");

  try {
    return await WithdrawAccountRepo({ accountId , amount });
  } catch (error) {
    throw error;
  }
};

export const getAccountService = async (userId: string) => {
  try {
    return await getAccountByUserIdRepo(userId);
  } catch (error: CustomError | any) {
    throw error;
  }
}






