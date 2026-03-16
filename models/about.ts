// AboutModel.ts
import { query } from "../utils/db";
import { AboutRow, AboutPayload } from "../interfaces/about";

export default class AboutModel {
  constructor() {}

  async createAbout(
    payload: AboutPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `INSERT INTO About (Detail) VALUES ($1)`;
    const res = await query(sql, [payload.Detail]);
    
    return { message: "About created", affectedRows: (res as any).rowCount || 0 };
  }

  async getAllAbout(): Promise<AboutRow[]> {
    const sql = `SELECT * FROM About`;
    return await query<AboutRow>(sql);
  }

  async getAbout(): Promise<AboutRow | undefined> {
    const sql = `SELECT * FROM About LIMIT 1`;
    const rows = await query<AboutRow>(sql);
    return rows[0];
  }

  async updateAbout(
    payload: AboutPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE About SET Detail = $1`;
    const res = await query(sql, [payload.Detail]);
    return { message: "About updated", affectedRows: (res as any).rowCount || 0 };
  }
 
  async deleteAbout(): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM About`;
    const res = await query(sql);
    return { message: "All About rows deleted", affectedRows: (res as any).rowCount || 0 };
  }
}