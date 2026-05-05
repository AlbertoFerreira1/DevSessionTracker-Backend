import pool from "../db";

export const findUserForLogin = async (username: string) => {
  const query = `
SELECT username,password,id from "Users" where
username = $1
`;

  const result = await pool.query(query, [username]);
  if (!result.rows || result.rows.length === 0) {
    return [];
  }
  return result.rows;
};
