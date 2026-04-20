import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/authServices";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(501).json({
        message: "No user or password provided",
      });
    }
    const loginData = {
      username,
      password,
    };
    const result = await AuthService.login(loginData);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
    return;
  }
};
