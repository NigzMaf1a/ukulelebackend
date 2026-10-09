"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
const mail_1 = require("../utils/mail");
class Faqs {
    constructor() { }
    async createFaq(data) {
        const sql = `
            INSERT INTO faqs
                (email, question, answer, approved)
            VALUES ($1, $2, $3, $4)
        `;
        const res = await (0, db_1.query)(sql, [
            data.email,
            data.question,
            data.answer ?? '',
            data.approved ?? 'No'
        ]);
        return {
            message: 'FAQ created successfully',
            affectedRows: res.rowCount || 0
        };
    }
    async readFaqs() {
        const sql = `
            SELECT *
            FROM faqs
            ORDER BY faqid ASC
        `;
        return await (0, db_1.query)(sql);
    }
    async readFaq(faqid) {
        const sql = `
            SELECT *
            FROM faqs
            WHERE faqid = $1
        `;
        const rows = await (0, db_1.query)(sql, [faqid]);
        return rows[0];
    }
    async updateFaq(faqid, data) {
        const sql = `
            UPDATE faqs
            SET email = $1,
                question = $2,
                answer = $3,
                approved = $4
            WHERE faqid = $5
        `;
        const res = await (0, db_1.query)(sql, [
            data.email,
            data.question,
            data.answer ?? '',
            data.approved ?? 'No',
            faqid
        ]);
        const affectedRows = res.rowCount || 0;
        if (affectedRows > 0 && data.answer?.trim()) {
            (0, mail_1.sendFaqAnswer)(data.email, data.question, data.answer).catch((error) => {
                const message = error instanceof Error
                    ? error.message
                    : 'Unknown error';
                console.error('Failed to send FAQ answer email:', message);
            });
        }
        return {
            message: 'FAQ updated successfully',
            affectedRows
        };
    }
    async updateFaqState(faqid, approved) {
        const sql = `
    UPDATE faqs
    SET approved = $1
    WHERE faqid = $2
  `;
        const res = await (0, db_1.query)(sql, [approved, faqid]);
        return {
            message: 'FAQ approval status updated successfully',
            affectedRows: res.rowCount || 0
        };
    }
    async deleteFaq(faqid) {
        const sql = `
            DELETE FROM faqs
            WHERE faqid = $1
        `;
        const res = await (0, db_1.query)(sql, [faqid]);
        return {
            message: 'FAQ deleted successfully',
            affectedRows: res.rowCount || 0
        };
    }
}
exports.default = Faqs;
