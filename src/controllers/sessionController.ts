import { Request, Response, NextFunction } from "express";
import * as SessionServices from "../services/sessionServices";
import { ApiResponse, NewSession, Sessions } from "../models/sessionModels";

export const getSessionsByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = Number(req.params.user_id);
    const sessions = await SessionServices.getSessionsByUser(user_id);

    const response: ApiResponse<Sessions[]> = {
      success: true,
      message: sessions.length
        ? "Sessions fetched successfully"
        : "No sessions for this user",
      data: sessions,
    };

    res.status(200).json(response);
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const addNewSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newSessionData: NewSession = req.body;
    const newID = await SessionServices.addNewSession(newSessionData);
    const response: ApiResponse<number> = {
      success: true,
      message: "New Session Created",
      data: newID,
    };
    res.status(201).json(response);
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const deleteSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = Number(req.params.user_id);
    const rowCount = await SessionServices.deleteSession(user_id);

    if (rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Session not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Session deleted",
      data: rowCount,
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
