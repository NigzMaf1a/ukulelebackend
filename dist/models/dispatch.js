"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class DispatchModel {
    constructor() { }
    async createDispatch(payload) {
        const sql = `
      INSERT INTO Dispatch
        (CustomerID, Name, dLocation, ServiceID, PhoneNo, Dispatched, DispatchDate)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING DispatchID
    `;
        const rows = await (0, db_1.query)(sql, [
            payload.CustomerID,
            payload.Name,
            payload.dLocation,
            payload.ServiceID,
            payload.PhoneNo,
            payload.Dispatched ?? "Pending",
            payload.DispatchDate ?? new Date(),
        ]);
        return { message: "Dispatch created successfully", dispatchID: rows[0].DispatchID };
    }
    async getAllDispatches() {
        const sql = `SELECT * FROM Dispatch`;
        return await (0, db_1.query)(sql);
    }
    async getDispatchById(dispatchID) {
        const sql = `SELECT * FROM Dispatch WHERE DispatchID = $1`;
        const rows = await (0, db_1.query)(sql, [dispatchID]);
        return rows[0];
    }
    async updateDispatch(dispatchID, data) {
        const sql = `
      UPDATE Dispatch
      SET CustomerID = $1, Name = $2, dLocation = $3, ServiceID = $4,
          PhoneNo = $5, Dispatched = $6, DispatchDate = $7
      WHERE DispatchID = $8
    `;
        const res = await (0, db_1.query)(sql, [
            data.CustomerID,
            data.Name,
            data.dLocation,
            data.ServiceID,
            data.PhoneNo,
            data.Dispatched,
            data.DispatchDate,
            dispatchID,
        ]);
        return { message: "Dispatch updated", affectedRows: res.rowCount || 0 };
    }
    async deleteDispatch(dispatchID) {
        const sql = `DELETE FROM Dispatch WHERE DispatchID = $1`;
        const res = await (0, db_1.query)(sql, [dispatchID]);
        return { message: "Dispatch deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = DispatchModel;
