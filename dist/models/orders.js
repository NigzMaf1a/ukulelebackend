"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class Orders {
    constructor() { }
    /**
     * CREATE - Orders + OrderItems (transaction)
     */
    async createOrder(data) {
        const client = await (0, db_1.getConnection)();
        try {
            await client.query("BEGIN");
            const orderSql = `
        INSERT INTO Orders
          (SupplyID, OrderDate, OrderAmount, OrderStatus)
        VALUES ($1, $2, $3, $4)
        RETURNING OrderID
      `;
            const orderResult = await client.query(orderSql, [
                data.SupplyID,
                data.OrderDate,
                data.OrderAmount,
                data.OrderStatus
            ]);
            const orderID = orderResult.rows[0].orderid;
            const itemSql = `
        INSERT INTO OrderItem
          (OrderID, SupplyType, Quantity)
        VALUES ($1, $2, $3)
      `;
            for (const item of data.items) {
                await client.query(itemSql, [
                    orderID,
                    item.SupplyType,
                    item.Quantity
                ]);
            }
            await client.query("COMMIT");
            return {
                message: "Order created with items",
                orderID
            };
        }
        catch (err) {
            await client.query("ROLLBACK");
            throw err;
        }
        finally {
            client.release();
        }
    }
    /**
     * READ ALL
     */
    async readOrders() {
        const sql = `SELECT * FROM Orders`;
        return await (0, db_1.query)(sql);
    }
    /**
     * READ SINGLE
     */
    async getOrderData(orderID) {
        const sql = `SELECT * FROM Orders WHERE OrderID = $1`;
        const rows = await (0, db_1.query)(sql, [orderID]);
        return rows[0];
    }
    /**
     * UPDATE
     */
    async updateOrder(orderID, data) {
        const sql = `
      UPDATE Orders
      SET SupplyID = $1,
          OrderDate = $2,
          OrderAmount = $3,
          OrderStatus = $4
      WHERE OrderID = $5
    `;
        const res = await (0, db_1.query)(sql, [
            data.SupplyID,
            data.OrderDate,
            data.OrderAmount,
            data.OrderStatus,
            orderID
        ]);
        return {
            message: "Order updated",
            affectedRows: res.rowCount || 0
        };
    }
    /**
     * DELETE
     */
    async deleteOrder(orderID) {
        const sql = `DELETE FROM Orders WHERE OrderID = $1`;
        const res = await (0, db_1.query)(sql, [orderID]);
        return {
            message: "Order deleted",
            affectedRows: res.rowCount || 0
        };
    }
}
exports.default = Orders;
