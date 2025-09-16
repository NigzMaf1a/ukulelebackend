// models/about.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { AboutRow, AboutPayload } from "../interfaces/about";

/**
 * AboutModel
 * Handles CRUD for the About table
 */
export default class AboutModel {
  constructor() {}

  /**
   * Create a new "About" record
   */
  async createAbout(
    payload: AboutPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `INSERT INTO About (Detail) VALUES (?)`;
    const [result] = await db.execute<ResultSetHeader>(sql, [payload.Detail]);
    return { message: "About created", affectedRows: result.affectedRows };
  }

  /**
   * Get all About rows (there’s usually just one)
   */
  async getAllAbout(): Promise<AboutRow[]> {
    const sql = `SELECT * FROM About`;
    const [rows] = await db.execute<AboutRow[]>(sql);
    return rows;
  }

  /**
   * Get the first About record (common use case)
   */
  async getAbout(): Promise<AboutRow | undefined> {
    const sql = `SELECT * FROM About LIMIT 1`;
    const [rows] = await db.execute<AboutRow[]>(sql);
    return rows[0];
  }

  /**
   * Update the About table
   * (Assumes there’s only one row — updates all rows)
   */
  async updateAbout(
    payload: AboutPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE About SET Detail = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [payload.Detail]);
    return { message: "About updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete all About records
   */
  async deleteAbout(): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM About`;
    const [result] = await db.execute<ResultSetHeader>(sql);
    return { message: "All About rows deleted", affectedRows: result.affectedRows };
  }
}
