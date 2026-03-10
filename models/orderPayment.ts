import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import OrderPaymentRow, { OrderPaymentPayload } from "../interfaces/orderPayment";

export default class OrderPayment {
  constructor() {}

  // CREATE
  async createOrderPayment(
    data: OrderPaymentPayload
  ): Promise<{ message: string; id: number }> {

    const sql = `
      INSERT INTO OrderPayment
        (OrderID, PaymentCode, PaymentDate, Amount)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.OrderID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount
    ]);

    return {
      message: "Order payment created",
      id: result.insertId
    };
  }

  // READ ALL
  async readOrderPayment(): Promise<OrderPaymentRow[]> {

    const sql = `SELECT * FROM OrderPayment`;

    const [rows] = await db.execute<OrderPaymentRow[]>(sql);

    return rows;
  }

  // READ SINGLE
  async getOrderPaymentData(
    orderPayID: number
  ): Promise<OrderPaymentRow | undefined> {

    const sql = `
      SELECT * FROM OrderPayment
      WHERE OrderPayID = ?
    `;

    const [rows] = await db.execute<OrderPaymentRow[]>(sql, [
      orderPayID
    ]);

    return rows[0];
  }

  // UPDATE
  async updateOrderPayment(
    orderPayID: number,
    data: OrderPaymentPayload
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      UPDATE OrderPayment
      SET OrderID = ?, PaymentCode = ?, PaymentDate = ?, Amount = ?
      WHERE OrderPayID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.OrderID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount,
      orderPayID
    ]);

    return {
      message: "Order payment updated",
      affectedRows: result.affectedRows
    };
  }

  // DELETE
  async deleteOrderPayment(
    orderPayID: number
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      DELETE FROM OrderPayment
      WHERE OrderPayID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      orderPayID
    ]);

    return {
      message: "Order payment deleted",
      affectedRows: result.affectedRows
    };
  }
}