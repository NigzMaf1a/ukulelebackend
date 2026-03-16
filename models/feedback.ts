import { query } from "../utils/db";
import { FeedbackRow, FeedbackPayload } from "../interfaces/feedback";

export default class FeedbackModel {
  constructor() {}

  async createFeedback(
    data: FeedbackPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Feedback
        (CustomerID, Name, Comments, Response, Rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING FeedbackID
    `;
    const rows = await query<{ FeedbackID: number }>(sql, [
      data.CustomerID,
      data.Name,
      data.Comments ?? null,
      data.Response ?? null,
      data.Rating,
    ]);
    return { message: "Feedback created", id: rows[0].FeedbackID };
  }

  async readFeedback(): Promise<FeedbackRow[]> {
    const sql = `SELECT * FROM Feedback`;
    return await query<FeedbackRow>(sql);
  }

  async getFeedbackData(feedbackID: number): Promise<FeedbackRow | undefined> {
    const sql = `SELECT * FROM Feedback WHERE FeedbackID = $1`;
    const rows = await query<FeedbackRow>(sql, [feedbackID]);
    return rows[0];
  }

  async updateFeedback(
    feedbackID: number,
    data: FeedbackPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Feedback
      SET CustomerID = $1, Name = $2, Comments = $3, Response = $4, Rating = $5
      WHERE FeedbackID = $6
    `;
    const res = await query(sql, [
      data.CustomerID,
      data.Name,
      data.Comments ?? null,
      data.Response ?? null,
      data.Rating,
      feedbackID,
    ]);
    return { message: "Feedback updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteFeedback(
    feedbackID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Feedback WHERE FeedbackID = $1`;
    const res = await query(sql, [feedbackID]);
    return { message: "Feedback deleted", affectedRows: (res as any).rowCount || 0 };
  }
}