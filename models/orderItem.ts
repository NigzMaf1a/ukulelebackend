import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import OrderItem, { OrderItemPayload } from "../interfaces/orderItem";

export default class OrderItemModel {
  constructor() {}

  // CREATE
  async createOrderItem(
    data: OrderItemPayload
  ): Promise<{ message: string; id: number }> {

    const sql = `
      INSERT INTO OrderItem
        (OrderID, SupplyType, Quantity)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.OrderID,
      data.SupplyType,
      data.Quantity
    ]);

    return {
      message: "Order item created",
      id: result.insertId
    };
  }

  // READ ALL
  async readOrderItem(): Promise<OrderItem[]> {

    const sql = `SELECT * FROM OrderItem`;

    const [rows] = await db.execute<OrderItem[]>(sql);

    return rows;
  }

  // READ SINGLE
  async getOrderItemData(
    orderItemID: number
  ): Promise<OrderItem | undefined> {

    const sql = `
      SELECT * FROM OrderItem
      WHERE OrderItemID = ?
    `;

    const [rows] = await db.execute<OrderItem[]>(sql, [
      orderItemID
    ]);

    return rows[0];
  }

  // UPDATE
  async updateOrderItem(
    orderItemID: number,
    data: OrderItemPayload
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      UPDATE OrderItem
      SET OrderID = ?, SupplyType = ?, Quantity = ?
      WHERE OrderItemID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.OrderID,
      data.SupplyType,
      data.Quantity,
      orderItemID
    ]);

    return {
      message: "Order item updated",
      affectedRows: result.affectedRows
    };
  }

  // DELETE
  async deleteOrderItem(
    orderItemID: number
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      DELETE FROM OrderItem
      WHERE OrderItemID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      orderItemID
    ]);

    return {
      message: "Order item deleted",
      affectedRows: result.affectedRows
    };
  }
}