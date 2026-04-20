import pool from "../db";

export const findUserForLogin = async (username: string) => {
  const query = `
SELECT username,password_hash from users where
username = $1
`;

  const result = await pool.query(query, [username]);
  if (!result.rows || result.rows.length === 0) {
    return [];
  }
  return result.rows;
};
