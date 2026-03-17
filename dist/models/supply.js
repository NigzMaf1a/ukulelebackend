"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class SupplyModel {
    constructor() { }
    /**
     * Create a new supply record
     */
    async createSupply(data) {
        const sql = `
      INSERT INTO Supply
        (Price, SupplierName, SupplyDate, PhoneNo, SupplyStatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING SupplyID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.Price,
            data.SupplierName,
            data.SupplyDate,
            data.PhoneNo,
            data.SupplyStatus,
        ]);
        return { message: "Supply record created", id: rows[0].SupplyID };
    }
    /**
     * Read all supply records
     */
    async readSupplies() {
        const sql = `SELECT * FROM Supply`;
        return await (0, db_1.query)(sql);
    }
    /**
     * Get one supply record by ID
     */
    async getSupplyData(supplyID) {
        const sql = `SELECT * FROM Supply WHERE SupplyID = $1`;
        const rows = await (0, db_1.query)(sql, [supplyID]);
        return rows[0];
    }
    /**
     * Update an existing supply record
     */
    async updateSupply(supplyID, data) {
        const sql = `
      UPDATE Supply
      SET Price = $1, SupplierName = $2, SupplyDate = $3, PhoneNo = $4, SupplyStatus = $5
      WHERE SupplyID = $6
    `;
        const res = await (0, db_1.query)(sql, [
            data.Price,
            data.SupplierName,
            data.SupplyDate,
            data.PhoneNo,
            data.SupplyStatus,
            supplyID,
        ]);
        return { message: "Supply record updated", affectedRows: res.rowCount || 0 };
    }
    /**
     * Delete a supply record
     */
    async deleteSupply(supplyID) {
        const sql = `DELETE FROM Supply WHERE SupplyID = $1`;
        const res = await (0, db_1.query)(sql, [supplyID]);
        return { message: "Supply record deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = SupplyModel;
