"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// AboutModel.ts
const db_1 = require("../utils/db");
class AboutModel {
    constructor() { }
    async createAbout(payload) {
        const sql = `INSERT INTO About (Detail) VALUES ($1)`;
        const res = await (0, db_1.query)(sql, [payload.Detail]);
        return { message: "About created", affectedRows: res.rowCount || 0 };
    }
    async getAllAbout() {
        const sql = `SELECT * FROM About`;
        return await (0, db_1.query)(sql);
    }
    async getAbout() {
        const sql = `SELECT * FROM About LIMIT 1`;
        const rows = await (0, db_1.query)(sql);
        return rows[0];
    }
    async updateAbout(payload) {
        const sql = `UPDATE About SET Detail = $1`;
        const res = await (0, db_1.query)(sql, [payload.Detail]);
        return { message: "About updated", affectedRows: res.rowCount || 0 };
    }
    async deleteAbout() {
        const sql = `DELETE FROM About`;
        const res = await (0, db_1.query)(sql);
        return { message: "All About rows deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = AboutModel;
