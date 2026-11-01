"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class FinanceModel {
    constructor() { }
    async createFinance(data) {
        const sql = `
            INSERT INTO Finance
                (
                    CustomerID,
                    Name,
                    PhoneNo,
                    TransactionName,
                    TransactionDate,
                    Amount,
                    TransactionStatus,
                    TransactType,
                    ServiceID
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
            data.transacttype,
            data.serviceid
        ]);
        return {
            message: "Finance record created",
            id: rows[0].TransactionID
        };
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
        const client = await (0, db_1.getConnection)();
        try {
            await client.query("BEGIN");
            const paymentResult = await client.query(`
                SELECT ServiceID
                FROM Finance
                WHERE TransactionID = $1
                FOR UPDATE
            `, [transactionID]);
            const payment = paymentResult.rows[0];
            console.log("Approval transaction ID:", transactionID);
            console.log("Raw payment query result:", payment);
            console.log("Retrieved ServiceID:", payment?.serviceid);
            if (!payment) {
                await client.query("ROLLBACK");
                return {
                    message: "Finance record not found",
                    affectedRows: 0
                };
            }
            const financeResult = await client.query(`
                UPDATE Finance
                SET TransactionStatus = 'Approved'
                WHERE TransactionID = $1
                RETURNING TransactionID
            `, [transactionID]);
            if (payment.serviceid !== null) {
                const serviceResult = await client.query(`
                    UPDATE Services
                    SET PaymentStatus = 'Paid'
                    WHERE ServiceID = $1
                `, [payment.serviceid]);
                if (serviceResult.rowCount === 0) {
                    throw new Error(`Associated service ${payment.serviceid} was not found`);
                }
            }
            await client.query("COMMIT");
            return {
                message: "Payment and associated service approved successfully",
                affectedRows: financeResult.rowCount || 0
            };
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    }
    async deleteFinance(transactionID) {
        const sql = `DELETE FROM Finance WHERE TransactionID = $1`;
        const res = await (0, db_1.query)(sql, [transactionID]);
        return {
            message: "Finance record deleted",
            affectedRows: res.rowCount || 0
        };
    }
}
exports.default = FinanceModel;
