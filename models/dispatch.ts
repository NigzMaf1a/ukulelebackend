import { query } from "../utils/db";
import { DispatchRow, DispatchPayload } from "../interfaces/dispatch";

export default class DispatchModel {
  constructor() {}

  async createDispatch(
    payload: DispatchPayload
  ): Promise<{ message: string; dispatchID: number }> {
    const sql = `
      INSERT INTO Dispatch
        (CustomerID, Name, dLocation, ServiceID, PhoneNo, Dispatched, DispatchDate)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING DispatchID
    `;
    const rows = await query<{ DispatchID: number }>(sql, [
      payload.CustomerID,
      payload.Name,
      payload.dLocation,
      payload.ServiceID,
      payload.PhoneNo,
      payload.Dispatched ?? "No",
      payload.DispatchDate ?? new Date(),
    ]);
    return { message: "Dispatch created successfully", dispatchID: rows[0].DispatchID };
  }

  async getAllDispatches(): Promise<DispatchRow[]> {
    const sql = `SELECT * FROM Dispatch`;
    return await query<DispatchRow>(sql);
  }

  async getDispatchById(dispatchID: number): Promise<DispatchRow | undefined> {
    const sql = `SELECT * FROM Dispatch WHERE DispatchID = $1`;
    const rows = await query<DispatchRow>(sql, [dispatchID]);
    return rows[0];
  }

  async updateDispatch(
    dispatchID: number,
    data: Partial<DispatchPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Dispatch
      SET CustomerID = $1, Name = $2, dLocation = $3, ServiceID = $4,
          PhoneNo = $5, Dispatched = $6, DispatchDate = $7
      WHERE DispatchID = $8
    `;
    const res = await query(sql, [
      data.CustomerID,
      data.Name,
      data.dLocation,
      data.ServiceID,
      data.PhoneNo,
      data.Dispatched,
      data.DispatchDate,
      dispatchID,
    ]);
    return { message: "Dispatch updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteDispatch(
    dispatchID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Dispatch WHERE DispatchID = $1`;
    const res = await query(sql, [dispatchID]);
    return { message: "Dispatch deleted", affectedRows: (res as any).rowCount || 0 };
  }
}