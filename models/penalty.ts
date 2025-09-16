// models/Penalty.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { PenaltyRow, PenaltyPayload } from "../interfaces/penalty";

export default class Penalty {
  constructor() {}

  /**
   * Create a new penalty record
   */
  async createPenalty(
    data: PenaltyPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Penalty
        (EquipmentID, Description, Condition, Penalty)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.Description,
      data.Condition,
      data.Penalty,
    ]);

    return { message: "Penalty created", id: result.insertId };
  }

  /**
   * Get all penalties
   */
  async readPenalties(): Promise<PenaltyRow[]> {
    const sql = `SELECT * FROM Penalty`;
    const [rows] = await db.execute<PenaltyRow[]>(sql);
    return rows;
  }

  /**
   * Update an existing penalty
   */
  async updatePenalty(
    penaltyID: number,
    data: PenaltyPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Penalty
      SET EquipmentID = ?, Description = ?, Condition = ?, Penalty = ?
      WHERE PenaltyID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.Description,
      data.Condition,
      data.Penalty,
      penaltyID,
    ]);

    return { message: "Penalty updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a penalty record
   */
  async deletePenalty(
    penaltyID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Penalty WHERE PenaltyID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [penaltyID]);
    return { message: "Penalty deleted", affectedRows: result.affectedRows };
  }

  /**
   * Fetch one penalty by its ID
   */
  async getPenaltyData(
    penaltyID: number
  ): Promise<PenaltyRow | undefined> {
    const sql = `SELECT * FROM Penalty WHERE PenaltyID = ?`;
    const [rows] = await db.execute<PenaltyRow[]>(sql, [penaltyID]);
    return rows[0];
  }
}
