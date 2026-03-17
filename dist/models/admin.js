"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Admin.ts
const db_1 = require("../utils/db");
class Admin {
    constructor() { }
    // --- User management ---
    async fetchPendingUsers() {
        return (0, db_1.query)(`SELECT * FROM Registration WHERE accStatus = 'Pending'`);
    }
    async fetchApprovedUsers() {
        return (0, db_1.query)(`SELECT * FROM Registration WHERE accStatus = 'Approved'`);
    }
    async fetchInactiveUsers() {
        return (0, db_1.query)(`SELECT * FROM Registration WHERE accStatus = 'Inactive'`);
    }
    async fetchAllUsers() {
        return (0, db_1.query)(`SELECT * FROM Registration`);
    }
    async approvePendingUser(regID) {
        const sql = `
      UPDATE Registration
      SET accStatus = 'Approved'
      WHERE RegID = $1 AND accStatus = 'Pending'
    `;
        const res = await (0, db_1.query)(sql, [regID]);
        return res.rowCount > 0;
    }
    async deactivateActiveUser(regID) {
        const sql = `
      UPDATE Registration
      SET accStatus = 'Inactive'
      WHERE RegID = $1 AND accStatus = 'Approved'
    `;
        const res = await (0, db_1.query)(sql, [regID]);
        return res.rowCount > 0;
    }
    async activateInactiveUser(regID) {
        const sql = `
      UPDATE Registration
      SET accStatus = 'Pending'
      WHERE RegID = $1 AND accStatus = 'Inactive'
    `;
        const res = await (0, db_1.query)(sql, [regID]);
        return res.rowCount > 0;
    }
    // --- Feedback ---
    async fetchFeedback() {
        return (0, db_1.query)(`SELECT * FROM Feedback`);
    }
    async addFeedbackResponse(feedbackID, response) {
        const sql = `
      UPDATE Feedback
      SET Response = $1
      WHERE FeedbackID = $2
    `;
        const res = await (0, db_1.query)(sql, [response, feedbackID]);
        return res.rowCount > 0;
    }
    // --- About ---
    async fetchAbout() {
        const rows = await (0, db_1.query)(`SELECT * FROM About LIMIT 1`);
        return rows[0] || null;
    }
    async updateAbout(detail) {
        const res = await (0, db_1.query)(`UPDATE About SET Detail = $1`, [detail]);
        return res.rowCount > 0;
    }
    // --- Contacts ---
    async fetchContacts() {
        const rows = await (0, db_1.query)(`SELECT * FROM Contact LIMIT 1`);
        return rows[0] || null;
    }
    async updateContacts(payload) {
        const sql = `
      UPDATE Contact
      SET PhoneNo = $1,
          EmailAddress = $2,
          Instagram = $3,
          Facebook = $4,
          POBox = $5
    `;
        const res = await (0, db_1.query)(sql, [
            payload.PhoneNo,
            payload.EmailAddress,
            payload.Instagram,
            payload.Facebook,
            payload.PoBox,
        ]);
        return res.rowCount > 0;
    }
    // --- Bookings ---
    async fetchBookings() {
        return (0, db_1.query)(`SELECT * FROM Booking`);
    }
    // --- Lending ---
    async fetchLending() {
        return (0, db_1.query)(`SELECT * FROM Lending`);
    }
    // --- Penalties ---
    async fetchPenalties() {
        return (0, db_1.query)(`SELECT * FROM Penalty`);
    }
    // --- Inspectors ---
    async fetchInspection() {
        return (0, db_1.query)(`SELECT * FROM Inspector`);
    }
    // --- Inventory ---
    async fetchInventory() {
        return (0, db_1.query)(`SELECT * FROM Inventory`);
    }
    // --- Finances ---
    async fetchFinances() {
        const sql = `
      SELECT CustomerID, Name, PhoneNo, TransactionID, TransactionName,
             TransactionDate, Amount, TransactType, ServiceID
      FROM Finance
    `;
        return (0, db_1.query)(sql);
    }
    // --- Supplies ---
    async fetchSupplies() {
        return (0, db_1.query)(`SELECT * FROM Supply`);
    }
    // --- Admin record by RegID ---
    async loggedInAdmin(RegID) {
        const rows = await (0, db_1.query)(`SELECT * FROM Registration WHERE RegID = $1 LIMIT 1`, [RegID]);
        return rows;
    }
}
exports.default = Admin;
