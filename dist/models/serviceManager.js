"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class ServiceManager {
    constructor() { }
    /**
     * Fetch all services that are Paid but still Pending
     */
    async fetchPending() {
        const sql = `
      SELECT *
      FROM Services
      WHERE PaymentStatus = 'Paid' AND ServiceStatus = 'Pending'
    `;
        return await (0, db_1.query)(sql);
    }
    /**
     * Approve a pending service by ID
     * Returns true if a row was updated
     */
    async approvePending(serviceID) {
        const sql = `
      UPDATE Services
      SET ServiceStatus = 'Approved'
      WHERE ServiceID = ? AND ServiceStatus = 'Pending'
    `;
        const result = await (0, db_1.query)(sql, [serviceID]);
        return result.affectedRows > 0;
    }
}
exports.default = ServiceManager;
