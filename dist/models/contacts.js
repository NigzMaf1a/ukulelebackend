"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class Contacts {
    constructor() { }
    async createContact(data) {
        const existing = await (0, db_1.query)(`SELECT * FROM Contact`);
        if (existing.length > 0) {
            const sql = `
        UPDATE Contact
        SET PhoneNo = $1, Instagram = $2, Facebook = $3, EmailAddress = $4, POBox = $5
      `;
            const res = await (0, db_1.query)(sql, [
                data.PhoneNo,
                data.Instagram,
                data.Facebook,
                data.EmailAddress,
                data.PoBox
            ]);
            return { message: 'Contact updated successfully', affectedRows: res.rowCount || 0 };
        }
        else {
            const sql = `
        INSERT INTO Contact
          (PhoneNo, Instagram, Facebook, EmailAddress, POBox)
        VALUES ($1, $2, $3, $4, $5)
      `;
            const res = await (0, db_1.query)(sql, [
                data.PhoneNo,
                data.Instagram,
                data.Facebook,
                data.EmailAddress,
                data.PoBox
            ]);
            return { message: 'Contact created successfully', affectedRows: res.rowCount || 0 };
        }
    }
    async readContact() {
        const sql = `SELECT * FROM Contact LIMIT 1`;
        const rows = await (0, db_1.query)(sql);
        return rows[0];
    }
    async deleteContact() {
        const sql = `DELETE FROM Contact`;
        const res = await (0, db_1.query)(sql);
        return { message: 'Contact deleted', affectedRows: res.rowCount || 0 };
    }
}
exports.default = Contacts;
