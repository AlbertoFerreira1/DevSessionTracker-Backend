import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
)=> {
  const authHeader =
    req.headers.authorization ||
    (req.headers["Authorization"] as string) ||
    (req.headers["authorization"] as string);
  const token = authHeader?.startsWith("Bearer")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, message: "Token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: `Invalid token: ${err.message}` });
    }
    (req as any).user = decoded; 
    next();
  });
};
