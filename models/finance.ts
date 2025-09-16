// models/Finance.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { FinanceRow, FinancePayload } from "../interfaces/finance";

export default class Finance {
  constructor() {}

  /**
   * Insert a finance transaction
   */
  async createFinance(
    data: FinancePayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Finance
        (CustomerID, Name, PhoneNo, TransactionDate, Amount, TransactType, ServiceID)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.CustomerID,
      data.Name,
      data.PhoneNo,
      data.TransactionDate,
      data.Amount,
      data.TransactType,
      data.ServiceID,
    ]);

    return { message: "Finance record created", id: result.insertId };
  }

  /**
   * Get all finance transactions
   */
  async readFinance(): Promise<FinanceRow[]> {
    const sql = `SELECT * FROM Finance`;
    const [rows] = await db.execute<FinanceRow[]>(sql);
    return rows;
  }

  /**
   * Update a finance transaction
   */
  async updateFinance(
    transactionID: number,
    data: FinancePayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Finance
      SET CustomerID = ?, Name = ?, PhoneNo = ?, TransactionDate = ?, Amount = ?, TransactType = ?, ServiceID = ?
      WHERE TransactionID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.CustomerID,
      data.Name,
      data.PhoneNo,
      data.TransactionDate,
      data.Amount,
      data.TransactType,
      data.ServiceID,
      transactionID,
    ]);

    return { message: "Finance record updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a finance transaction
   */
  async deleteFinance(
    transactionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Finance WHERE TransactionID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [transactionID]);
    return { message: "Finance record deleted", affectedRows: result.affectedRows };
  }

  /**
   * Get a single finance record
   */
  async getFinanceData(
    transactionID: number
  ): Promise<FinanceRow | undefined> {
    const sql = `SELECT * FROM Finance WHERE TransactionID = ?`;
    const [rows] = await db.execute<FinanceRow[]>(sql, [transactionID]);
    return rows[0];
  }
}
