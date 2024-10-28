// check if the user authenticated or not.

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.Service";

export const IsAuthunticated = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  console.log("------middleware:IsAuthunticated---------");

  try {
    //not found
    if (!req.cookies.jwt) {
      throw new Error("Not authorized");
    }

    const decoded: any = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET as string
    );

    // Check if token is expired
    const isTokenExpired = Date.now() >= decoded.exp * 1000;
    if (isTokenExpired) {
      console.log("Token has expired");
      return res.status(403).json({ message: "Token expired" });
    }
    const user = await findUserById(decoded.id);

    if (user && !isTokenExpired) {
      req.userId = user.id
      next();
    } else {
      res.status(403).json({ message: "invalid token" });
    }
  } catch (error: any) {
    error.StatusCode = 401;
    next(error);
  }
};