"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class FinanceManagerModel {
    constructor() { }
    async fetchNotPaid() {
        const sql = `SELECT * FROM Services WHERE PaymentStatus = 'Not Paid'`;
        return await (0, db_1.query)(sql);
    }
    async fetchFinanceByCustomerID(customerID) {
        const sql = `SELECT * FROM Finance WHERE CustomerID = $1`;
        return await (0, db_1.query)(sql, [customerID]);
    }
    async updateServicesToPaid(serviceID) {
        const sql = `UPDATE Services SET PaymentStatus = 'Paid' WHERE ServiceID = $1`;
        const res = await (0, db_1.query)(sql, [serviceID]);
        return { message: "Service marked as paid", affectedRows: res.rowCount || 0 };
    }
}
exports.default = FinanceManagerModel;
