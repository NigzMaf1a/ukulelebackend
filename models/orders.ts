import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import OrderRow, { OrderPayload } from "../interfaces/orders";
import OrderItem, { OrderItemPayload } from "../interfaces/orderItem";

export default class Orders {
  constructor() {}

  /**
   * CREATE - Inserts into Orders and corresponding OrderItems
   * @param data Order info including an array of items
   */
  async createOrder(
    data: OrderPayload & { items: OrderItemPayload[] }
  ): Promise<{ message: string; orderID: number }> {

    // Start a transaction so both inserts succeed together
    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
      // Insert into Orders
      const orderSql = `
        INSERT INTO Orders (SupplyID, OrderDate, OrderAmount, OrderStatus)
        VALUES (?, ?, ?, ?)
      `;
      const [orderResult] = await conn.execute<ResultSetHeader>(orderSql, [
        data.SupplyID,
        data.OrderDate,
        data.OrderAmount,
        data.OrderStatus
      ]);
      const orderID = orderResult.insertId;

      // Insert each OrderItem
      const itemSql = `
        INSERT INTO OrderItem (OrderID, SupplyType, Quantity)
        VALUES (?, ?, ?)
      `;
      for (const item of data.items) {
        await conn.execute<ResultSetHeader>(itemSql, [
          orderID,
          item.SupplyType,
          item.Quantity
        ]);
      }

      // Commit transaction
      await conn.commit();
      conn.release();

      return { message: "Order created with items", orderID };
    } catch (err) {
      // Rollback if anything fails
      await conn.rollback();
      conn.release();
      throw err;
    }
  }

  // READ ALL
  async readOrders(): Promise<OrderRow[]> {
    const sql = `SELECT * FROM Orders`;
    const [rows] = await db.execute<OrderRow[]>(sql);
    return rows;
  }

  // READ SINGLE
  async getOrderData(orderID: number): Promise<OrderRow | undefined> {
    const sql = `SELECT * FROM Orders WHERE OrderID = ?`;
    const [rows] = await db.execute<OrderRow[]>(sql, [orderID]);
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
    return { message: "Order updated", affectedRows: result.affectedRows };
  }

  // DELETE
  async deleteOrder(orderID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Orders WHERE OrderID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [orderID]);
    return { message: "Order deleted", affectedRows: result.affectedRows };
  }
}