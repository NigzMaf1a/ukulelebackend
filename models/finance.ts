import { query } from "../utils/db";
import { FinanceRow, FinancePayload } from "../interfaces/finance";

export default class FinanceModel {
  constructor() {}

  async createFinance(
    data: FinancePayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Finance
        (CustomerID, Name, PhoneNo, TransactionDate, Amount, TransactType, ServiceID)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING TransactionID
    `;
    const rows = await query<{ TransactionID: number }>(sql, [
      data.CustomerID,
      data.Name,
      data.PhoneNo,
      data.TransactionDate,
      data.Amount,
      data.TransactType,
      data.ServiceID,
    ]);
    return { message: "Finance record created", id: rows[0].TransactionID };
  }

  async readFinance(): Promise<FinanceRow[]> {
    const sql = `SELECT * FROM Finance`;
    return await query<FinanceRow>(sql);
  }

  async getFinanceData(transactionID: number): Promise<FinanceRow | undefined> {
    const sql = `SELECT * FROM Finance WHERE TransactionID = $1`;
    const rows = await query<FinanceRow>(sql, [transactionID]);
    return rows[0];
  }

  async updateFinance(
    transactionID: number,
    data: FinancePayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Finance
      SET CustomerID = $1, Name = $2, PhoneNo = $3, TransactionDate = $4, Amount = $5, TransactType = $6, ServiceID = $7
      WHERE TransactionID = $8
    `;
    const res = await query(sql, [
      data.CustomerID,
      data.Name,
      data.PhoneNo,
      data.TransactionDate,
      data.Amount,
      data.TransactType,
      data.ServiceID,
      transactionID,
    ]);
    return { message: "Finance record updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteFinance(
    transactionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Finance WHERE TransactionID = $1`;
    const res = await query(sql, [transactionID]);
    return { message: "Finance record deleted", affectedRows: (res as any).rowCount || 0 };
  }
}