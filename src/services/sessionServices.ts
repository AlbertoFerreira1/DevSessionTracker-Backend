import { ApiError } from "../utils/errors/ApiError";
import * as SessionRepo from "../repositories/sessionRepo";
import { NewSession, Sessions } from "../models/sessionModels";

export const getSessionsByUser = async (
  user_id: number,
): Promise<Sessions[]> => {
  if (!user_id || user_id <= 0) {
    throw new ApiError(400, "Invalid user id");
  }

  const sessions = await SessionRepo.getSessionsByUser(user_id);
  return sessions;
};

export const addNewSession = async (
  newSessionData: NewSession,
): Promise<number> => {
  if (!newSessionData) {
    throw new ApiError(400, "No Session Data to Insert");
  }
  const newID = await SessionRepo.addNewSession(newSessionData);
  return newID;
};


export const deleteSession = async (user_id: number):Promise<number | null> => {
  if (!user_id) {
    throw new ApiError(400, "No user provided");
  }
  const rowCount = await SessionRepo.deleteSession(user_id);
  return rowCount;
};
