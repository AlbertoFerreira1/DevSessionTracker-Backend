import { LoginData, LoginResponse } from "../models/usersModels";
import * as UserRepo from "../repositories/userRepo";
import { ApiError } from "../utils/errors/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (userData: LoginData): Promise<LoginResponse> => {
  if (!userData || !userData.username || !userData.password) {
    throw new ApiError(400, "No Data Provided for Login");
  }

  const data = await UserRepo.findUserForLogin(userData.username);

  if (!data || data.length === 0) {
    throw new ApiError(401, "Invalid username or password");
  }

  const user = data[0];

  console.log(user);

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid username or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    },
  );

  return {
    message: "Login successfull",
    token,
    userData: {
      username: user.username,
      id: user.id
    },
  };
};
