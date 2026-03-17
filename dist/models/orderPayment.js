"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class OrderPayment {
    constructor() { }
    async createOrderPayment(data) {
        const sql = `
      INSERT INTO OrderPayment
        (OrderID, PaymentCode, PaymentDate, Amount)
      VALUES ($1, $2, $3, $4)
      RETURNING OrderPayID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.OrderID,
            data.PaymentCode,
            data.PaymentDate,
            data.Amount,
        ]);
        return { message: "Order payment created", id: rows[0].OrderPayID };
    }
    async readOrderPayment() {
        const sql = `SELECT * FROM OrderPayment`;
        return await (0, db_1.query)(sql);
    }
    async getOrderPaymentData(orderPayID) {
        const sql = `
      SELECT * FROM OrderPayment
      WHERE OrderPayID = $1
    `;
        const rows = await (0, db_1.query)(sql, [orderPayID]);
        return rows[0];
    }
    async updateOrderPayment(orderPayID, data) {
        const sql = `
      UPDATE OrderPayment
      SET OrderID = $1, PaymentCode = $2, PaymentDate = $3, Amount = $4
      WHERE OrderPayID = $5
    `;
        const res = await (0, db_1.query)(sql, [data.OrderID, data.PaymentCode, data.PaymentDate, data.Amount, orderPayID]);
        return { message: "Order payment updated", affectedRows: res.rowCount || 0 };
    }
    async deleteOrderPayment(orderPayID) {
        const sql = `
      DELETE FROM OrderPayment
      WHERE OrderPayID = $1
    `;
        const res = await (0, db_1.query)(sql, [orderPayID]);
        return { message: "Order payment deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = OrderPayment;
