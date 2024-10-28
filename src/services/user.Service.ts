import { Response } from 'express';
import { createUser, getUserById, loginUser } from "../repositories/users.Repo";
import { UserInput } from "../utils/types/User";

export const CreateUserService = async ({
  name,
  email,
  password,
}: Omit<UserInput, "id" | "account">) => {
  console.log("------service:CreateUserService---------");

  try {
    return await createUser({ name , email, password });
  } catch (err) {
    throw err;
  }
};

export const loginUserService = async (
    {
  email,
  password
}: Omit<UserInput, "id"  | "account" | "name"> , res:Response): Promise<UserInput> => {
  console.log("------service:loginUserService---------");

  try {
    return await loginUser({ email , password } , res);
  } catch (err) {
    throw err;
  }
};

export const findUserById = async (id: string): Promise<UserInput> => {
  console.log("------service:findUserById---------");

  try {
    return (await getUserById(id)) as unknown as UserInput;
  } catch (err) {
    throw err;
  }
};
