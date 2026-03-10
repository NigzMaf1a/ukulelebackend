import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { AboutRow, AboutPayload } from "../interfaces/about";

export default class AboutModel {
  constructor() {}

  async createAbout(
    payload: AboutPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `INSERT INTO About (Detail) VALUES (?)`;
    const [result] = await db.execute<ResultSetHeader>(sql, [payload.Detail]);
    return { message: "About created", affectedRows: result.affectedRows };
  }


  async getAllAbout(): Promise<AboutRow[]> {
    const sql = `SELECT * FROM About`;
    const [rows] = await db.execute<AboutRow[]>(sql);
    return rows;
  }

  async getAbout(): Promise<AboutRow | undefined> {
    const sql = `SELECT * FROM About LIMIT 1`;
    const [rows] = await db.execute<AboutRow[]>(sql);
    return rows[0];
  }

  async updateAbout(
    payload: AboutPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE About SET Detail = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [payload.Detail]);
    return { message: "About updated", affectedRows: result.affectedRows };
  }

  async deleteAbout(): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM About`;
    const [result] = await db.execute<ResultSetHeader>(sql);
    return { message: "All About rows deleted", affectedRows: result.affectedRows };
  }
}
