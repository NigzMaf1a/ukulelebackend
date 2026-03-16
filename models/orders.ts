import { query, getConnection } from "../utils/db";
import OrderRow, { OrderPayload } from "../interfaces/orders";
import OrderItem, { OrderItemPayload } from "../interfaces/orderItem";

export default class Orders {
  constructor() {}

  // CREATE - Orders + OrderItems (transaction)
  // async createOrder(
  //   data: OrderPayload & { items: OrderItemPayload[] }
  // ): Promise<{ message: string; orderID: number }> {
  //   const conn = await getConnection();
  //   await conn.beginTransaction();

  //   try {
  //     const orderSql = `
  //       INSERT INTO Orders (SupplyID, OrderDate, OrderAmount, OrderStatus)
  //       VALUES ($1, $2, $3, $4)
  //       RETURNING OrderID
  //     `;
  //     const orderRows = await conn.query<{ OrderID: number }>(orderSql, [
  //       data.SupplyID,
  //       data.OrderDate,
  //       data.OrderAmount,
  //       data.OrderStatus,
  //     ]);
  //     const orderID = orderRows[0].OrderID;

  //     const itemSql = `
  //       INSERT INTO OrderItem (OrderID, SupplyType, Quantity)
  //       VALUES ($1, $2, $3)
  //     `;
  //     for (const item of data.items) {
  //       await conn.query(itemSql, [orderID, item.SupplyType, item.Quantity]);
  //     }

  //     await conn.commit();
  //     conn.release();
  //     return { message: "Order created with items", orderID };
  //   } catch (err) {
  //     await conn.rollback();
  //     conn.release();
  //     throw err;
  //   }
  // }

  // READ ALL
  async readOrders(): Promise<OrderRow[]> {
    const sql = `SELECT * FROM Orders`;
    return await query<OrderRow>(sql);
  }

  // READ SINGLE
  async getOrderData(orderID: number): Promise<OrderRow | undefined> {
    const sql = `SELECT * FROM Orders WHERE OrderID = $1`;
    const rows = await query<OrderRow>(sql, [orderID]);
    return rows[0];
  }

  // UPDATE
  async updateOrder(
    orderID: number,
    data: OrderPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Orders
      SET SupplyID = $1, OrderDate = $2, OrderAmount = $3, OrderStatus = $4
      WHERE OrderID = $5
    `;
    const res = await query(sql, [
      data.SupplyID,
      data.OrderDate,
      data.OrderAmount,
      data.OrderStatus,
      orderID,
    ]);
    return { message: "Order updated", affectedRows: (res as any).rowCount || 0 };
  }

  // DELETE
  async deleteOrder(orderID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Orders WHERE OrderID = $1`;
    const res = await query(sql, [orderID]);
    return { message: "Order deleted", affectedRows: (res as any).rowCount || 0 };
  }
}