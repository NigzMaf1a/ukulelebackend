import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import OrderRow, { OrderPayload } from "../interfaces/orders";

export default class Orders {
  constructor() {}

  // CREATE
  async createOrder(
    data: OrderPayload
  ): Promise<{ message: string; id: number }> {

    const sql = `
      INSERT INTO Orders
        (SupplyID, OrderDate, OrderAmount, OrderStatus)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.SupplyID,
      data.OrderDate,
      data.OrderAmount,
      data.OrderStatus
    ]);

    return {
      message: "Order created",
      id: result.insertId
    };
  }

  // READ ALL
  async readOrders(): Promise<OrderRow[]> {

    const sql = `SELECT * FROM Orders`;

    const [rows] = await db.execute<OrderRow[]>(sql);

    return rows;
  }

  // READ SINGLE
  async getOrderData(
    orderID: number
  ): Promise<OrderRow | undefined> {

    const sql = `
      SELECT * FROM Orders
      WHERE OrderID = ?
    `;

    const [rows] = await db.execute<OrderRow[]>(sql, [
      orderID
    ]);

    return rows[0];
  }

  // UPDATE
  async updateOrder(
    orderID: number,
    data: OrderPayload
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      UPDATE Orders
      SET SupplyID = ?, OrderDate = ?, OrderAmount = ?, OrderStatus = ?
      WHERE OrderID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.SupplyID,
      data.OrderDate,
      data.OrderAmount,
      data.OrderStatus,
      orderID
    ]);

    return {
      message: "Order updated",
      affectedRows: result.affectedRows
    };
  }

  // DELETE
  async deleteOrder(
    orderID: number
  ): Promise<{ message: string; affectedRows: number }> {

    const sql = `
      DELETE FROM Orders
      WHERE OrderID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      orderID
    ]);

    return {
      message: "Order deleted",
      affectedRows: result.affectedRows
    };
  }
}