"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class FinanceModel {
    constructor() { }
    async createFinance(data) {
        const sql = `
      INSERT INTO Finance
        (CustomerID, Name, PhoneNo, TransactionName,TransactionDate, Amount, TransactStatus, ServiceID)
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)
      RETURNING TransactionID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.customerid,
            data.name,
            data.phoneno,
            data.transactionname,
            data.transactiondate,
            data.amount,
            data.transactionstatus,
            data.serviceid,
        ]);
        return { message: "Finance record created", id: rows[0].TransactionID };
    }
    async readFinance() {
        const sql = `SELECT * FROM Finance`;
        return await (0, db_1.query)(sql);
    }
    async getFinanceData(transactionID) {
        const sql = `SELECT * FROM Finance WHERE TransactionID = $1`;
        const rows = await (0, db_1.query)(sql, [transactionID]);
        return rows[0];
    }
    async updateFinance(transactionID) {
        const sql = `
    UPDATE Finance
    SET TransactionStatus = 'Approved'
    WHERE TransactionID = $1
  `;
        const res = await (0, db_1.query)(sql, [transactionID]);
        return {
            message: "Payment approved successfully",
            affectedRows: res.rowCount || 0,
        };
    }
    async deleteFinance(transactionID) {
        const sql = `DELETE FROM Finance WHERE TransactionID = $1`;
        const res = await (0, db_1.query)(sql, [transactionID]);
        return { message: "Finance record deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = FinanceModel;
