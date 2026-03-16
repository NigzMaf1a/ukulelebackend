import { query } from "../utils/db";
import OrderItem, { OrderItemPayload } from "../interfaces/orderItem";

export default class OrderItemModel {
  constructor() {}

  async createOrderItem(data: OrderItemPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO OrderItem
        (OrderID, SupplyType, Quantity)
      VALUES ($1, $2, $3)
      RETURNING OrderItemID
    `;
    const rows = await query<{ OrderItemID: number }>(sql, [
      data.OrderID,
      data.SupplyType,
      data.Quantity,
    ]);
    return { message: "Order item created", id: rows[0].OrderItemID };
  }

  async readOrderItem(): Promise<OrderItem[]> {
    const sql = `SELECT * FROM OrderItem`;
    return await query<OrderItem>(sql);
  }

  async getOrderItemData(orderItemID: number): Promise<OrderItem | undefined> {
    const sql = `
      SELECT * FROM OrderItem
      WHERE OrderItemID = $1
    `;
    const rows = await query<OrderItem>(sql, [orderItemID]);
    return rows[0];
  }

  async updateOrderItem(orderItemID: number, data: OrderItemPayload): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE OrderItem
      SET OrderID = $1, SupplyType = $2, Quantity = $3
      WHERE OrderItemID = $4
    `;
    const res = await query(sql, [data.OrderID, data.SupplyType, data.Quantity, orderItemID]);
    return { message: "Order item updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteOrderItem(orderItemID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      DELETE FROM OrderItem
      WHERE OrderItemID = $1
    `;
    const res = await query(sql, [orderItemID]);
    return { message: "Order item deleted", affectedRows: (res as any).rowCount || 0 };
  }
}