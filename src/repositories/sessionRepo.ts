import pool from "../db";
import { NewSession, Sessions } from "../models/sessionModels";

export const getSessionsByUser = async (
  user_id: number,
): Promise<Sessions[]> => {
  const query = `
    SELECT * from "Sessions" 
    WHERE user_id = $1
    `;

  const result = await pool.query(query, [user_id]);

  if (!result.rows || result.rows.length === 0) {
    return [];
  }
  return result.rows;
};

export const addNewSession = async (
  newSessionData: NewSession,
): Promise<number> => {
  const query = `
    INSERT INTO "Sessions" (date,project_name,duration_minutes,topic,notes,blockers,focus_score,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning id
    `;

  const result = await pool.query(query, [
    newSessionData.date,
    newSessionData.project_name,
    newSessionData.duration_minutes,
    newSessionData.topic,
    newSessionData.notes,
    newSessionData.blockers,
    newSessionData.focus_score,
    newSessionData.user_id,
  ]);

  return result.rows[0].id;
};

export const deleteSession = async (user_id: number) => {
  const query = `
    DELETE FROM Sessions 
    WHERE user_id = $1
    `;

  const result = await pool.query(query, [user_id]);

  return result.rowCount;
};


