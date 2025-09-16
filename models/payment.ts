// models/Payment.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { PaymentRow, PaymentPayload } from "../interfaces/payment";

export default class Payment {
  constructor() {}

  /**
   * Create a new payment record
   */
  async createPayment(
    data: PaymentPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Payment
        (MemberID, Name, PhoneNo, Amount, Date)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.MemberID,
      data.Name,
      data.PhoneNo,
      data.Amount,
      data.Date,
    ]);

    return { message: "Payment record created", id: result.insertId };
  }

  /**
   * Get all payments
   */
  async readPayments(): Promise<PaymentRow[]> {
    const sql = `SELECT * FROM Payment`;
    const [rows] = await db.execute<PaymentRow[]>(sql);
    return rows;
  }

  /**
   * Update an existing payment record
   */
  async updatePayment(
    processID: number,
    data: PaymentPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Payment
      SET MemberID = ?, Name = ?, PhoneNo = ?, Amount = ?, Date = ?
      WHERE ProcessID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.MemberID,
      data.Name,
      data.PhoneNo,
      data.Amount,
      data.Date,
      processID,
    ]);

    return { message: "Payment record updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a payment record
   */
  async deletePayment(
    processID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Payment WHERE ProcessID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [processID]);
    return { message: "Payment record deleted", affectedRows: result.affectedRows };
  }

  /**
   * Fetch one payment record by ID
   */
  async getPaymentData(
    processID: number
  ): Promise<PaymentRow | undefined> {
    const sql = `SELECT * FROM Payment WHERE ProcessID = ?`;
    const [rows] = await db.execute<PaymentRow[]>(sql, [processID]);
    return rows[0];
  }
}
