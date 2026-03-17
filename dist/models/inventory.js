"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class InventoryModel {
    constructor() { }
    async createInventory(data) {
        const sql = `
      INSERT INTO Inventory
        (Price, Description, PurchaseDate, Condition, Availability)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING EquipmentID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.Price,
            data.Description,
            data.PurchaseDate,
            data.Condition,
            data.Availability,
        ]);
        return { message: "Inventory record created", id: rows[0].EquipmentID };
    }
    async readInventory() {
        const sql = `SELECT * FROM Inventory`;
        return await (0, db_1.query)(sql);
    }
    async updateInventory(equipmentID, data) {
        const sql = `
      UPDATE Inventory
      SET Price = $1, Description = $2, PurchaseDate = $3, Condition = $4, Availability = $5
      WHERE EquipmentID = $6
    `;
        const res = await (0, db_1.query)(sql, [
            data.Price,
            data.Description,
            data.PurchaseDate,
            data.Condition,
            data.Availability,
            equipmentID,
        ]);
        return { message: "Inventory record updated", affectedRows: res.rowCount || 0 };
    }
    async deleteInventory(equipmentID) {
        const sql = `DELETE FROM Inventory WHERE EquipmentID = $1`;
        const res = await (0, db_1.query)(sql, [equipmentID]);
        return { message: "Inventory record deleted", affectedRows: res.rowCount || 0 };
    }
    async getInventoryData(equipmentID) {
        const sql = `SELECT * FROM Inventory WHERE EquipmentID = $1`;
        const rows = await (0, db_1.query)(sql, [equipmentID]);
        return rows[0];
    }
}
exports.default = InventoryModel;
