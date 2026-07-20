import { query } from "../utils/db";
import { FinanceRow, FinancePayload } from "../interfaces/finance";

export default class FinanceModel {
  constructor() { }

  //wants to bother

  async createFinance(
    data: FinancePayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Finance
        (CustomerID, Name, PhoneNo, TransactionName,TransactionDate, Amount, TransactionStatus, ServiceID)
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)
      RETURNING TransactionID
    `;
    const rows = await query<{ TransactionID: number }>(sql, [
      data.customerid,
      data.name,
      data.phoneno,
      data.transactionname,
      data.transactiondate,
      data.amount,
      data.transactionstatus,
      data.serviceid,
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
    transactionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
    UPDATE Finance
    SET TransactionStatus = 'Approved'
    WHERE TransactionID = $1
  `;

    const res = await query(sql, [transactionID]);

    return {
      message: "Payment approved successfully",
      affectedRows: (res as any).rowCount || 0,
    };
  }

  async deleteFinance(
    transactionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Finance WHERE TransactionID = $1`;
    const res = await query(sql, [transactionID]);
    return { message: "Finance record deleted", affectedRows: (res as any).rowCount || 0 };
  }
}