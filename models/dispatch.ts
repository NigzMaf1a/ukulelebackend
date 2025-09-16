// models/dispatch.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { DispatchRow, DispatchPayload } from "../interfaces/dispatch";

/**
 * DispatchModel
 * Handles CRUD for the Dispatch table
 */
export default class DispatchModel {
  constructor() {}

  /**
   * Create a new dispatch record
   * Defaults:
   *  - Dispatched = "No"
   *  - DispatchDate = today (if not provided)
   */
  async createDispatch(
    payload: DispatchPayload
  ): Promise<{ message: string; dispatchID: number }> {
    const sql = `
      INSERT INTO Dispatch
        (CustomerID, Name, dLocation, ServiceID, PhoneNo, Dispatched, DispatchDate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      payload.CustomerID,
      payload.Name,
      payload.dLocation,
      payload.ServiceID,
      payload.PhoneNo,
      payload.Dispatched ?? "No",
      payload.DispatchDate ?? new Date(),
    ]);

    return {
      message: "Dispatch created successfully",
      dispatchID: result.insertId,
    };
  }

  /**
   * Get all dispatch records
   */
  async getAllDispatches(): Promise<DispatchRow[]> {
    const sql = `SELECT * FROM Dispatch`;
    const [rows] = await db.execute<DispatchRow[]>(sql);
    return rows;
  }

  /**
   * Get a single dispatch by ID
   */
  async getDispatchById(
    dispatchID: number
  ): Promise<DispatchRow | undefined> {
    const sql = `SELECT * FROM Dispatch WHERE DispatchID = ?`;
    const [rows] = await db.execute<DispatchRow[]>(sql, [dispatchID]);
    return rows[0];
  }

  /**
   * Update an existing dispatch
   */
  async updateDispatch(
    dispatchID: number,
    data: Partial<DispatchPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Dispatch
      SET CustomerID = ?, Name = ?, dLocation = ?, ServiceID = ?,
          PhoneNo = ?, Dispatched = ?, DispatchDate = ?
      WHERE DispatchID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.CustomerID,
      data.Name,
      data.dLocation,
      data.ServiceID,
      data.PhoneNo,
      data.Dispatched,
      data.DispatchDate,
      dispatchID,
    ]);

    return {
      message: "Dispatch updated",
      affectedRows: result.affectedRows,
    };
  }

  /**
   * Delete a dispatch record
   */
  async deleteDispatch(
    dispatchID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Dispatch WHERE DispatchID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [dispatchID]);
    return { message: "Dispatch deleted", affectedRows: result.affectedRows };
  }
}
