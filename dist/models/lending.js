"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class LendingModel {
    constructor() { }
    async createLending(payload) {
        const sql = `
      INSERT INTO Lending
        (LendingDate, Cost, Hours, ServiceID, LendingStatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING LendID
    `;
        const rows = await (0, db_1.query)(sql, [
            payload.lendingdate,
            payload.cost,
            payload.hours,
            payload.serviceid,
            payload.lendingstatus,
        ]);
        return { message: "Lending record created", lendID: rows[0].LendID };
    }
    async getAllLending() {
        const sql = `SELECT * FROM Lending`;
        return await (0, db_1.query)(sql);
    }
    async getLendingById(lendID) {
        const sql = `SELECT * FROM Lending WHERE LendID = $1`;
        const rows = await (0, db_1.query)(sql, [lendID]);
        return rows[0];
    }
    async updateLending(lendID, data) {
        const sql = `
    UPDATE Lending
    SET LendingStatus = $1,
        Performed = $2
    WHERE LendID = $3
  `;
        const res = await (0, db_1.query)(sql, [
            data.lendingstatus,
            data.performed,
            lendID,
        ]);
        return {
            message: "Lending record updated",
            affectedRows: res.rowCount || 0,
        };
    }
    async deleteLending(lendID) {
        const sql = `DELETE FROM Lending WHERE LendID = $1`;
        const res = await (0, db_1.query)(sql, [lendID]);
        return { message: "Lending record deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = LendingModel;
