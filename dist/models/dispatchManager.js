"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class DispatchManager {
    constructor() { }
    async fetchUndispatched() {
        const sql = `
      SELECT * FROM Dispatch
      WHERE Dispatched = 'No'
    `;
        return await (0, db_1.query)(sql);
    }
    async updateDispatch(dispatchID) {
        const sql = `
      UPDATE Dispatch
      SET Dispatched = 'Yes'
      WHERE DispatchID = $1 AND Dispatched = 'No'
    `;
        const res = await (0, db_1.query)(sql, [dispatchID]);
        return { message: "Dispatch updated", affectedRows: res.rowCount || 0 };
    }
}
exports.default = DispatchManager;
