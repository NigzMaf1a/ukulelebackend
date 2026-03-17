"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class InspectorModel {
    constructor() { }
    async createInspector(data) {
        const sql = `
      INSERT INTO Inspector
        (EquipmentID, InspectionDate, InspectorName, Condition)
      VALUES ($1, $2, $3, $4)
      RETURNING InspectionID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.EquipmentID,
            data.InspectionDate,
            data.InspectorName,
            data.Condition,
        ]);
        return { message: "Inspection created", id: rows[0].InspectionID };
    }
    async readInspectors() {
        const sql = `SELECT * FROM Inspector`;
        return await (0, db_1.query)(sql);
    }
    async updateInspector(inspectionID, data) {
        const sql = `
      UPDATE Inspector
      SET EquipmentID = $1, InspectionDate = $2, InspectorName = $3, Condition = $4
      WHERE InspectionID = $5
    `;
        const res = await (0, db_1.query)(sql, [
            data.EquipmentID,
            data.InspectionDate,
            data.InspectorName,
            data.Condition,
            inspectionID,
        ]);
        return { message: "Inspection updated", affectedRows: res.rowCount || 0 };
    }
    async deleteInspector(inspectionID) {
        const sql = `DELETE FROM Inspector WHERE InspectionID = $1`;
        const res = await (0, db_1.query)(sql, [inspectionID]);
        return { message: "Inspection deleted", affectedRows: res.rowCount || 0 };
    }
    async getInspectorData(inspectionID) {
        const sql = `SELECT * FROM Inspector WHERE InspectionID = $1`;
        const rows = await (0, db_1.query)(sql, [inspectionID]);
        return rows[0];
    }
}
exports.default = InspectorModel;
