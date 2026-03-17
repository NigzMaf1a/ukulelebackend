"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class Penalty {
    constructor() { }
    /**
     * Create a new penalty record
     */
    async createPenalty(data) {
        const sql = `
      INSERT INTO Penalty (EquipmentID, Description, Condition, Penalty)
      VALUES ($1, $2, $3, $4)
      RETURNING PenaltyID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.EquipmentID,
            data.Description,
            data.Condition,
            data.Penalty,
        ]);
        return { message: "Penalty created", id: rows[0].PenaltyID };
    }
    /**
     * Get all penalties
     */
    async readPenalties() {
        const sql = `SELECT * FROM Penalty`;
        return await (0, db_1.query)(sql);
    }
    /**
     * Update an existing penalty
     */
    async updatePenalty(penaltyID, data) {
        const sql = `
      UPDATE Penalty
      SET EquipmentID = $1, Description = $2, Condition = $3, Penalty = $4
      WHERE PenaltyID = $5
    `;
        const res = await (0, db_1.query)(sql, [
            data.EquipmentID,
            data.Description,
            data.Condition,
            data.Penalty,
            penaltyID,
        ]);
        return { message: "Penalty updated", affectedRows: res.rowCount || 0 };
    }
    /**
     * Delete a penalty record
     */
    async deletePenalty(penaltyID) {
        const sql = `DELETE FROM Penalty WHERE PenaltyID = $1`;
        const res = await (0, db_1.query)(sql, [penaltyID]);
        return { message: "Penalty deleted", affectedRows: res.rowCount || 0 };
    }
    /**
     * Fetch one penalty by its ID
     */
    async getPenaltyData(penaltyID) {
        const sql = `SELECT * FROM Penalty WHERE PenaltyID = $1`;
        const rows = await (0, db_1.query)(sql, [penaltyID]);
        return rows[0];
    }
}
exports.default = Penalty;
