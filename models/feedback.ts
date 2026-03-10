import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { FeedbackRow, FeedbackPayload } from "../interfaces/feedback";

export default class Feedback {
  constructor() {}

  async createFeedback(
    data: FeedbackPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Feedback
        (CustomerID, Name, Comments, Response, Rating)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.CustomerID,
      data.Name,
      data.Comments ?? null,
      data.Response ?? null,
      data.Rating,
    ]);

    return { message: "Feedback created", id: result.insertId };
  }

  async readFeedback(): Promise<FeedbackRow[]> {
    const sql = `SELECT * FROM Feedback`;
    const [rows] = await db.execute<FeedbackRow[]>(sql);
    return rows;
  }

  async updateFeedback(
    feedbackID: number,
    data: FeedbackPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Feedback
      SET CustomerID = ?, Name = ?, Comments = ?, Response = ?, Rating = ?
      WHERE FeedbackID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.CustomerID,
      data.Name,
      data.Comments ?? null,
      data.Response ?? null,
      data.Rating,
      feedbackID,
    ]);

    return { message: "Feedback updated", affectedRows: result.affectedRows };
  }

  async deleteFeedback(
    feedbackID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Feedback WHERE FeedbackID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [feedbackID]);
    return { message: "Feedback deleted", affectedRows: result.affectedRows };
  }

  async getFeedbackData(
    feedbackID: number
  ): Promise<FeedbackRow | undefined> {
    const sql = `SELECT * FROM Feedback WHERE FeedbackID = ?`;
    const [rows] = await db.execute<FeedbackRow[]>(sql, [feedbackID]);
    return rows[0];
  }
}
