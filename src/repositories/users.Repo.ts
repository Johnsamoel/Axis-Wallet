import { prisma } from "../prisma/client";
import { UserInput } from "../utils/types/User";
import { hashPassword } from "../utils/password";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import CustomError  from '../classes/CustomError';
import { AccountStatus } from "../utils/enums/AccountStatus";

// create user
export const createUser = async ({
  name,
  email,
  password,
}: Omit<UserInput, "id" | "account">) => {
  console.log("------repository:createUser---------");

  try {
    // check if the user already exists
    const user = await getUserByEmail({ email });

    if (user) {
      throw new CustomError("Bad Request", 400);
    }

    // create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name,
      },
    });

    if (!newUser) throw new CustomError("Something went wrong", 501 );

    return {
      newUser: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      }
    };
  } catch (error) {
    console.log("Error creating user:", error);
    throw error;
  }
};

// get user by email
export const getUserByEmail = async ({
  email,
}: Omit<UserInput, "password" | "id" | "account" | "name">) => {
  console.log("------repository:getUserByEmail---------");

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log("Error getting email:", error);
    throw error;
  }
};

// login user
export const loginUser = async (
  { email, password }: Omit<UserInput, "id" | "name" | "account">,
  res: Response // Ensure that the 'res' parameter is of type 'Response'
) => {
  console.log("------repository:loginUser---------");

  try {
    const user = await getUserByEmail({ email });

    if (!user) {
      throw new CustomError("Invalid credentials" , 400);
    }

    // check the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new CustomError("Invalid credentials" , 400);

    // Create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Set the token in the cookies
    res.cookie("jwt", token, { httpOnly: true, secure: true });

    return user as unknown as UserInput;
  } catch (error) {
    console.log("Error while logging in", error);
    throw error;
  }
};

// get user by Id
export const getUserById = async (id: string) => {
  console.log("------repository:getUserById---------");

  try {
    return await prisma.user.findUnique({ where: { id: id } });
  } catch (error) {
    console.log("Error while getting user", error);
    throw error;
  }
};
