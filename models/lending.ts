import { query } from "../utils/db";
import LendingRow, {LendingPayload } from "../interfaces/services";

export default class LendingModel {
  constructor() {}

  async createLending(
    payload: LendingPayload
  ): Promise<{ message: string; lendID: number }> {
    const sql = `
      INSERT INTO Lending
        (LendingDate, Cost, Hours, ServiceID, LendingStatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING LendID
    `;
    const rows = await query<{ LendID: number }>(sql, [
      payload.LendingDate,
      payload.Cost,
      payload.Hours,
      payload.ServiceID,
      payload.LendingStatus,
    ]);
    return { message: "Lending record created", lendID: rows[0].LendID };
  }

  async getAllLending(): Promise<LendingRow[]> {
    const sql = `SELECT * FROM Lending`;
    return await query<LendingRow>(sql);
  }

  async getLendingById(lendID: number): Promise<LendingRow | undefined> {
    const sql = `SELECT * FROM Lending WHERE LendID = $1`;
    const rows = await query<LendingRow>(sql, [lendID]);
    return rows[0];
  }

  async updateLending(
    lendID: number,
    data: Partial<LendingPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Lending
      SET LendingDate = $1, Cost = $2, Hours = $3, ServiceID = $4, LendingStatus = $5
      WHERE LendID = $6
    `;
    const res = await query(sql, [
      data.LendingDate,
      data.Cost,
      data.Hours,
      data.ServiceID,
      data.LendingStatus,
      lendID,
    ]);
    return { message: "Lending record updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteLending(
    lendID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Lending WHERE LendID = $1`;
    const res = await query(sql, [lendID]);
    return { message: "Lending record deleted", affectedRows: (res as any).rowCount || 0 };
  }
}