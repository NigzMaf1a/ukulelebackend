// models/lending.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { LendingRow, LendingPayload } from "../interfaces/services";

/**
 * LendingModel
 * Handles CRUD for the Lending table
 */
export default class LendingModel {
  constructor() {}

  /**
   * Create a new lending record
   */
  async createLending(
    payload: LendingPayload
  ): Promise<{ message: string; lendID: number }> {
    const sql = `
      INSERT INTO Lending
        (EquipmentID, LendingDate, Cost, Hours, ServiceID, LendingStatus)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      payload.EquipmentID,
      payload.LendingDate,
      payload.Cost,
      payload.Hours,
      payload.ServiceID,
      payload.LendingStatus,
    ]);

    return {
      message: "Lending record created successfully",
      lendID: result.insertId,
    };
  }

  /**
   * Fetch all lending records
   */
  async getAllLending(): Promise<LendingRow[]> {
    const sql = `SELECT * FROM Lending`;
    const [rows] = await db.execute<LendingRow[]>(sql);
    return rows;
  }

  /**
   * Fetch a single lending record by ID
   */
  async getLendingById(lendID: number): Promise<LendingRow | undefined> {
    const sql = `SELECT * FROM Lending WHERE LendID = ?`;
    const [rows] = await db.execute<LendingRow[]>(sql, [lendID]);
    return rows[0];
  }

  /**
   * Update an existing lending record
   */
  async updateLending(
    lendID: number,
    data: Partial<LendingPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Lending
      SET EquipmentID = ?, LendingDate = ?, Cost = ?, Hours = ?, ServiceID = ?, LendingStatus = ?
      WHERE LendID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.LendingDate,
      data.Cost,
      data.Hours,
      data.ServiceID,
      data.LendingStatus,
      lendID,
    ]);

    return {
      message: "Lending record updated",
      affectedRows: result.affectedRows,
    };
  }

  /**
   * Delete a lending record by ID
   */
  async deleteLending(
    lendID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Lending WHERE LendID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [lendID]);
    return { message: "Lending record deleted", affectedRows: result.affectedRows };
  }
}
