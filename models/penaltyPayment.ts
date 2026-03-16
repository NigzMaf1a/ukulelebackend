import { query } from "../utils/db";
import {PenaltyPaymentRow,  PenaltyPaymentPayload } from "../interfaces/penaltyPayment";

export default class PenaltyPayment {
  constructor() {}

  /**
   * Create a new penalty payment record
   */
  async createPenaltyPayment(
    data: PenaltyPaymentPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO PenaltyPayment
        (PenaltyID, PaymentCode, PaymentDate, Amount)
      VALUES ($1, $2, $3, $4)
      RETURNING PenaltyPaymentID
    `;
    const rows = await query<{ PenaltyPaymentID: number }>(sql, [
      data.PenaltyID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount,
    ]);

    return { message: "Penalty payment created", id: rows[0].PenaltyPaymentID };
  }

  /**
   * Get all penalty payments
   */
  async readPenaltyPayment(): Promise<PenaltyPaymentRow[]> {
    const sql = `SELECT * FROM PenaltyPayment`;
    return await query<PenaltyPaymentRow>(sql);
  }

  /**
   * Fetch one penalty payment by ID
   */
  async getPenaltyPaymentData(
    penaltyPaymentID: number
  ): Promise<PenaltyPaymentRow | undefined> {
    const sql = `SELECT * FROM PenaltyPayment WHERE PenaltyPaymentID = $1`;
    const rows = await query<PenaltyPaymentRow>(sql, [penaltyPaymentID]);
    return rows[0];
  }

  /**
   * Update a penalty payment record
   */
  async updatePenaltyPayment(
    penaltyPaymentID: number,
    data: PenaltyPaymentPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE PenaltyPayment
      SET PenaltyID = $1, PaymentCode = $2, PaymentDate = $3, Amount = $4
      WHERE PenaltyPaymentID = $5
    `;
    const res = await query(sql, [
      data.PenaltyID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount,
      penaltyPaymentID,
    ]);

    return { message: "Penalty payment updated", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Delete a penalty payment record
   */
  async deletePenaltyPayment(
    penaltyPaymentID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM PenaltyPayment WHERE PenaltyPaymentID = $1`;
    const res = await query(sql, [penaltyPaymentID]);
    return { message: "Penalty payment deleted", affectedRows: (res as any).rowCount || 0 };
  }
}