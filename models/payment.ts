import { query } from "../utils/db";
import {PaymentRow, PaymentPayload } from "../interfaces/payment";

export default class Payment {
  constructor() {}

  /**
   * Create a new payment record
   */
  async createPayment(
    data: PaymentPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Payment (MemberID, Name, PhoneNo, Amount, Date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING ProcessID
    `;
    const rows = await query<{ ProcessID: number }>(sql, [
      data.MemberID,
      data.Name,
      data.PhoneNo,
      data.Amount,
      data.Date,
    ]);
    return { message: "Payment record created", id: rows[0].ProcessID };
  }

  /**
   * Get all payments
   */
  async readPayments(): Promise<PaymentRow[]> {
    const sql = `SELECT * FROM Payment`;
    return await query<PaymentRow>(sql);
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
      SET MemberID = $1, Name = $2, PhoneNo = $3, Amount = $4, Date = $5
      WHERE ProcessID = $6
    `;
    const res = await query(sql, [
      data.MemberID,
      data.Name,
      data.PhoneNo,
      data.Amount,
      data.Date,
      processID,
    ]);
    return { message: "Payment record updated", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Delete a payment record
   */
  async deletePayment(
    processID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Payment WHERE ProcessID = $1`;
    const res = await query(sql, [processID]);
    return { message: "Payment record deleted", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Fetch one payment record by ID
   */
  async getPaymentData(
    processID: number
  ): Promise<PaymentRow | undefined> {
    const sql = `SELECT * FROM Payment WHERE ProcessID = $1`;
    const rows = await query<PaymentRow>(sql, [processID]);
    return rows[0];
  }
}