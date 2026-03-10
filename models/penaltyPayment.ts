import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import {
  PenaltyPaymentRow,
  PenaltyPaymentPayload
} from "../interfaces/penaltyPayment";

export default class PenaltyPayment {
  constructor() {}

  // CREATE
  async createPenaltyPayment(
    data: PenaltyPaymentPayload
  ): Promise<{ message: string; id: number }> {

    const sql = `
      INSERT INTO PenaltyPayment
        (PenaltyID, PaymentCode, PaymentDate, Amount)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.PenaltyID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount
    ]);

    return {
      message: "Penalty payment created",
      id: result.insertId
    };
  }

  // READ ALL
  async readPenaltyPayment(): Promise<PenaltyPaymentRow[]> {

    const sql = `SELECT * FROM PenaltyPayment`;

    const [rows] = await db.execute<PenaltyPaymentRow[]>(sql);

    return rows;
  }

  // READ SINGLE
  async getPenaltyPaymentData(
    penaltyPaymentID: number
  ): Promise<PenaltyPaymentRow | undefined> {

    const sql = `
      SELECT * FROM PenaltyPayment
      WHERE PenaltyPaymentID = ?
    `;

    const [rows] = await db.execute<PenaltyPaymentRow[]>(sql, [
      penaltyPaymentID
    ]);

    return rows[0];
  }

  // UPDATE
  async updatePenaltyPayment(
    penaltyPaymentID: number,
    data: PenaltyPaymentPayload
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      UPDATE PenaltyPayment
      SET PenaltyID = ?, PaymentCode = ?, PaymentDate = ?, Amount = ?
      WHERE PenaltyPaymentID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.PenaltyID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount,
      penaltyPaymentID
    ]);

    return {
      message: "Penalty payment updated",
      affectedRows: result.affectedRows
    };
  }

  // DELETE
  async deletePenaltyPayment(
    penaltyPaymentID: number
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      DELETE FROM PenaltyPayment
      WHERE PenaltyPaymentID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      penaltyPaymentID
    ]);

    return {
      message: "Penalty payment deleted",
      affectedRows: result.affectedRows
    };
  }
}