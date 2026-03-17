"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class OrderItemModel {
    constructor() { }
    async createOrderItem(data) {
        const sql = `
      INSERT INTO OrderItem
        (OrderID, SupplyType, Quantity)
      VALUES ($1, $2, $3)
      RETURNING OrderItemID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.OrderID,
            data.SupplyType,
            data.Quantity,
        ]);
        return { message: "Order item created", id: rows[0].OrderItemID };
    }
    async readOrderItem() {
        const sql = `SELECT * FROM OrderItem`;
        return await (0, db_1.query)(sql);
    }
    async getOrderItemData(orderItemID) {
        const sql = `
      SELECT * FROM OrderItem
      WHERE OrderItemID = $1
    `;
        const rows = await (0, db_1.query)(sql, [orderItemID]);
        return rows[0];
    }
    async updateOrderItem(orderItemID, data) {
        const sql = `
      UPDATE OrderItem
      SET OrderID = $1, SupplyType = $2, Quantity = $3
      WHERE OrderItemID = $4
    `;
        const res = await (0, db_1.query)(sql, [data.OrderID, data.SupplyType, data.Quantity, orderItemID]);
        return { message: "Order item updated", affectedRows: res.rowCount || 0 };
    }
    async deleteOrderItem(orderItemID) {
        const sql = `
      DELETE FROM OrderItem
      WHERE OrderItemID = $1
    `;
        const res = await (0, db_1.query)(sql, [orderItemID]);
        return { message: "Order item deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = OrderItemModel;
