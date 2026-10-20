"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class InstrumentModel {
    constructor() { }
    async createInstrument(data) {
        const sql = `
      INSERT INTO Instrument
        (Price, Description, PurchaseDate, dCondition, Availability)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING InstrumentID AS instrumentid
    `;
        const rows = await (0, db_1.query)(sql, [
            data.price,
            data.description,
            data.purchasedate,
            data.dcondition,
            data.availability
        ]);
        return {
            message: "Instrument record created",
            id: rows[0].instrumentid
        };
    }
    async readInstruments() {
        const sql = `SELECT * FROM Instrument`;
        return await (0, db_1.query)(sql);
    }
    async updateInstrument(instrumentID, data) {
        const sql = `
      UPDATE Instrument
      SET Price = $1,
          Description = $2,
          PurchaseDate = $3,
          dCondition = $4,
          Availability = $5
      WHERE InstrumentID = $6
    `;
        const res = await (0, db_1.query)(sql, [
            data.price,
            data.description,
            data.purchasedate,
            data.dcondition,
            data.availability,
            instrumentID
        ]);
        return {
            message: "Instrument record updated",
            affectedRows: res.rowCount || 0
        };
    }
    async deleteInstrument(instrumentID) {
        const sql = `DELETE FROM Instrument WHERE InstrumentID = $1`;
        const res = await (0, db_1.query)(sql, [instrumentID]);
        return {
            message: "Instrument record deleted",
            affectedRows: res.rowCount || 0
        };
    }
    async getInstrumentData(instrumentID) {
        const sql = `SELECT * FROM Instrument WHERE InstrumentID = $1`;
        const rows = await (0, db_1.query)(sql, [instrumentID]);
        return rows[0];
    }
}
exports.default = InstrumentModel;
