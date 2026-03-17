"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class AllocatedEquipmentModel {
    constructor() { }
    async createAllocatedEquipment(data) {
        const sql = `
      INSERT INTO AllocatedEquipment
        (EquipmentID, LendID, RegID, EquipStatus)
      VALUES ($1, $2, $3, $4)
    `;
        const res = await (0, db_1.query)(sql, [
            data.EquipmentID,
            data.LendID,
            data.RegID,
            data.EquipStatus,
        ]);
        return { message: "Allocated equipment created", affectedRows: res.rowCount || 0 };
    }
    async readAllocatedEquipment() {
        const sql = `SELECT * FROM AllocatedEquipment`;
        return await (0, db_1.query)(sql);
    }
    async getAllocatedEquipmentData(allocatedEquipmentID) {
        const sql = `
      SELECT * FROM AllocatedEquipment
      WHERE AllocatedEquipmentID = $1
    `;
        const rows = await (0, db_1.query)(sql, [allocatedEquipmentID]);
        return rows[0];
    }
    async updateAllocatedEquipment(allocatedEquipmentID, data) {
        const sql = `
      UPDATE AllocatedEquipment
      SET EquipmentID = $1, LendID = $2, RegID = $3, EquipStatus = $4
      WHERE AllocatedEquipmentID = $5
    `;
        const res = await (0, db_1.query)(sql, [
            data.EquipmentID,
            data.LendID,
            data.RegID,
            data.EquipStatus,
            allocatedEquipmentID,
        ]);
        return { message: `Allocated equipment ${allocatedEquipmentID} updated`, affectedRows: res.rowCount || 0 };
    }
    async deleteAllocatedEquipment(allocatedEquipmentID) {
        const sql = `
      DELETE FROM AllocatedEquipment
      WHERE AllocatedEquipmentID = $1
    `;
        const res = await (0, db_1.query)(sql, [allocatedEquipmentID]);
        return { message: `Allocated equipment ${allocatedEquipmentID} deleted`, affectedRows: res.rowCount || 0 };
    }
}
exports.default = AllocatedEquipmentModel;
