"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class PenaltyPayment {
    constructor() { }
    /**
     * Create a new penalty payment record
     */
    async createPenaltyPayment(data) {
        const sql = `
      INSERT INTO PenaltyPayment
        (PenaltyID, PaymentCode, PaymentDate, Amount)
      VALUES ($1, $2, $3, $4)
      RETURNING PenaltyPaymentID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.PenaltyID,
            data.PaymentCode,
            data.PaymentDate,
            data.Amount,
        ]);
        return { message: "Penalty payment created", id: rows[0].PenaltyPaymentID };
    }
    /**
     * Get all penalty payments
     */
    async readPenaltyPayment() {
        const sql = `SELECT * FROM PenaltyPayment`;
        return await (0, db_1.query)(sql);
    }
    /**
     * Fetch one penalty payment by ID
     */
    async getPenaltyPaymentData(penaltyPaymentID) {
        const sql = `SELECT * FROM PenaltyPayment WHERE PenaltyPaymentID = $1`;
        const rows = await (0, db_1.query)(sql, [penaltyPaymentID]);
        return rows[0];
    }
    /**
     * Update a penalty payment record
     */
    async updatePenaltyPayment(penaltyPaymentID, data) {
        const sql = `
      UPDATE PenaltyPayment
      SET PenaltyID = $1, PaymentCode = $2, PaymentDate = $3, Amount = $4
      WHERE PenaltyPaymentID = $5
    `;
        const res = await (0, db_1.query)(sql, [
            data.PenaltyID,
            data.PaymentCode,
            data.PaymentDate,
            data.Amount,
            penaltyPaymentID,
        ]);
        return { message: "Penalty payment updated", affectedRows: res.rowCount || 0 };
    }
    /**
     * Delete a penalty payment record
     */
    async deletePenaltyPayment(penaltyPaymentID) {
        const sql = `DELETE FROM PenaltyPayment WHERE PenaltyPaymentID = $1`;
        const res = await (0, db_1.query)(sql, [penaltyPaymentID]);
        return { message: "Penalty payment deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = PenaltyPayment;
