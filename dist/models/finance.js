"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class FinanceModel {
    constructor() { }
    async createFinance(data) {
        const sql = `
      INSERT INTO Finance
        (CustomerID, Name, PhoneNo, TransactionDate, Amount, TransactType, ServiceID)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING TransactionID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.CustomerID,
            data.Name,
            data.PhoneNo,
            data.TransactionDate,
            data.Amount,
            data.TransactType,
            data.ServiceID,
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
    async updateFinance(transactionID, data) {
        const sql = `
      UPDATE Finance
      SET CustomerID = $1, Name = $2, PhoneNo = $3, TransactionDate = $4, Amount = $5, TransactType = $6, ServiceID = $7
      WHERE TransactionID = $8
    `;
        const res = await (0, db_1.query)(sql, [
            data.CustomerID,
            data.Name,
            data.PhoneNo,
            data.TransactionDate,
            data.Amount,
            data.TransactType,
            data.ServiceID,
            transactionID,
        ]);
        return { message: "Finance record updated", affectedRows: res.rowCount || 0 };
    }
    async deleteFinance(transactionID) {
        const sql = `DELETE FROM Finance WHERE TransactionID = $1`;
        const res = await (0, db_1.query)(sql, [transactionID]);
        return { message: "Finance record deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = FinanceModel;
