import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  loginUserService,
  CreateUserService,
} from "../services/user.Service";
import CustomError from "../classes/CustomError";

const Login = async (
  req: Request<{ password: string; email: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const user = await loginUserService({ email, password }, res);

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    } else {
      res.status(200).json(user);
    }
  } catch (error : CustomError | any) {
    if(error.message === "Invalid credentials" || error.code == 400) {
      res.status(400).json({ message: "Invalid credentials" });
    }else{
      next(error);
    }
  }
};

const Register = async (
  req: Request<{ password: string; email: string; name: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const createdUserData = await CreateUserService({ email, password, name });

    if (!createdUserData) {
      return res.status(404).json({ message: "Something went wrong." });
    } else {
      res.status(201).json(createdUserData);
    }
  } catch (error : CustomError | any) {
    if(error.code == 400 || error.code == 501) {
      console.log(error.message);
      res.status(error.code).json({ message: error.message });
    }else{
      next(new Error("something went wrong"));
    }
  
  }
};

// log user out
const Logout = (req: Request, res: Response, next: NextFunction): Response => {
    try {
      return res
        .clearCookie("jwt")
        .clearCookie("token")
        .status(200)
        .json({ message: "Logged out successfully" });
    } catch (error) {
      const newError = new Error('Internal Server Error');
      (newError as any).statusCode = 500; 
  
      next(newError);
      return res; 
    }
  };
  

export { Login, Register , Logout };
