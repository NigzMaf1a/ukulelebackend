import { query } from "../utils/db";
import {PenaltyRow,  PenaltyPayload } from "../interfaces/penalty";

export default class Penalty {
  constructor() {}

  /**
   * Create a new penalty record
   */
  async createPenalty(
    data: PenaltyPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Penalty (EquipmentID, Description, Condition, Penalty)
      VALUES ($1, $2, $3, $4)
      RETURNING PenaltyID
    `;
    const rows = await query<{ PenaltyID: number }>(sql, [
      data.EquipmentID,
      data.Description,
      data.Condition,
      data.Penalty,
    ]);
    return { message: "Penalty created", id: rows[0].PenaltyID };
  }

  /**
   * Get all penalties
   */
  async readPenalties(): Promise<PenaltyRow[]> {
    const sql = `SELECT * FROM Penalty`;
    return await query<PenaltyRow>(sql);
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
      SET EquipmentID = $1, Description = $2, Condition = $3, Penalty = $4
      WHERE PenaltyID = $5
    `;
    const res = await query(sql, [
      data.EquipmentID,
      data.Description,
      data.Condition,
      data.Penalty,
      penaltyID,
    ]);
    return { message: "Penalty updated", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Delete a penalty record
   */
  async deletePenalty(
    penaltyID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Penalty WHERE PenaltyID = $1`;
    const res = await query(sql, [penaltyID]);
    return { message: "Penalty deleted", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Fetch one penalty by its ID
   */
  async getPenaltyData(
    penaltyID: number
  ): Promise<PenaltyRow | undefined> {
    const sql = `SELECT * FROM Penalty WHERE PenaltyID = $1`;
    const rows = await query<PenaltyRow>(sql, [penaltyID]);
    return rows[0];
  }
}