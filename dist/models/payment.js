"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class Payment {
    constructor() { }
    /**
     * Create a new payment record
     */
    async createPayment(data) {
        const sql = `
      INSERT INTO Payment (MemberID, Name, PhoneNo, Amount, Date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING ProcessID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.MemberID,
            data.Name,
            data.PhoneNo,
            data.Amount,
            data.Date,
        ]);
        return { message: "Payment record created", id: rows[0].ProcessID };
    }
    /**
     * Get all payments
     */
    async readPayments() {
        const sql = `SELECT * FROM Payment`;
        return await (0, db_1.query)(sql);
    }
    /**
     * Update an existing payment record
     */
    async updatePayment(processID, data) {
        const sql = `
      UPDATE Payment
      SET MemberID = $1, Name = $2, PhoneNo = $3, Amount = $4, Date = $5
      WHERE ProcessID = $6
    `;
        const res = await (0, db_1.query)(sql, [
            data.MemberID,
            data.Name,
            data.PhoneNo,
            data.Amount,
            data.Date,
            processID,
        ]);
        return { message: "Payment record updated", affectedRows: res.rowCount || 0 };
    }
    /**
     * Delete a payment record
     */
    async deletePayment(processID) {
        const sql = `DELETE FROM Payment WHERE ProcessID = $1`;
        const res = await (0, db_1.query)(sql, [processID]);
        return { message: "Payment record deleted", affectedRows: res.rowCount || 0 };
    }
    /**
     * Fetch one payment record by ID
     */
    async getPaymentData(processID) {
        const sql = `SELECT * FROM Payment WHERE ProcessID = $1`;
        const rows = await (0, db_1.query)(sql, [processID]);
        return rows[0];
    }
}
exports.default = Payment;
