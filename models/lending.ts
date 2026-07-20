import { query } from "../utils/db";
import { LendingPayload } from "../interfaces/services";
import { LendingRow } from "../interfaces/services";

export default class LendingModel {
  constructor() { }

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
      payload.lendingdate,
      payload.cost,
      payload.hours,
      payload.serviceid,
      payload.lendingstatus,
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
    data: Pick<LendingPayload, "lendingstatus" | "performed">
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
    UPDATE Lending
    SET LendingStatus = $1,
        Performed = $2
    WHERE LendID = $3
  `;

    const res = await query(sql, [
      data.lendingstatus,
      data.performed,
      lendID,
    ]);

    return {
      message: "Lending record updated",
      affectedRows: (res as any).rowCount || 0,
    };
  }

  async deleteLending(
    lendID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Lending WHERE LendID = $1`;
    const res = await query(sql, [lendID]);
    return { message: "Lending record deleted", affectedRows: (res as any).rowCount || 0 };
  }
}