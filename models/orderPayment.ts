import { query } from "../utils/db";
import OrderPaymentRow, { OrderPaymentPayload } from "../interfaces/orderPayment";

export default class OrderPayment {
  constructor() {}

  async createOrderPayment(data: OrderPaymentPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO OrderPayment
        (OrderID, PaymentCode, PaymentDate, Amount)
      VALUES ($1, $2, $3, $4)
      RETURNING OrderPayID
    `;
    const rows = await query<{ OrderPayID: number }>(sql, [
      data.OrderID,
      data.PaymentCode,
      data.PaymentDate,
      data.Amount,
    ]);
    return { message: "Order payment created", id: rows[0].OrderPayID };
  }

  async readOrderPayment(): Promise<OrderPaymentRow[]> {
    const sql = `SELECT * FROM OrderPayment`;
    return await query<OrderPaymentRow>(sql);
  }

  async getOrderPaymentData(orderPayID: number): Promise<OrderPaymentRow | undefined> {
    const sql = `
      SELECT * FROM OrderPayment
      WHERE OrderPayID = $1
    `;
    const rows = await query<OrderPaymentRow>(sql, [orderPayID]);
    return rows[0];
  }

  async updateOrderPayment(orderPayID: number, data: OrderPaymentPayload): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE OrderPayment
      SET OrderID = $1, PaymentCode = $2, PaymentDate = $3, Amount = $4
      WHERE OrderPayID = $5
    `;
    const res = await query(sql, [data.OrderID, data.PaymentCode, data.PaymentDate, data.Amount, orderPayID]);
    return { message: "Order payment updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteOrderPayment(orderPayID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      DELETE FROM OrderPayment
      WHERE OrderPayID = $1
    `;
    const res = await query(sql, [orderPayID]);
    return { message: "Order payment deleted", affectedRows: (res as any).rowCount || 0 };
  }
}