"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class FeedbackModel {
    constructor() { }
    async createFeedback(data) {
        const sql = `
      INSERT INTO Feedback
        (CustomerID, Name, Comments, Response, Rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING FeedbackID
    `;
        const rows = await (0, db_1.query)(sql, [
            data.CustomerID,
            data.Name,
            data.Comments ?? null,
            data.Response ?? null,
            data.Rating,
        ]);
        return { message: "Feedback created", id: rows[0].FeedbackID };
    }
    async readFeedback() {
        const sql = `SELECT * FROM Feedback`;
        return await (0, db_1.query)(sql);
    }
    async getFeedbackData(feedbackID) {
        const sql = `SELECT * FROM Feedback WHERE FeedbackID = $1`;
        const rows = await (0, db_1.query)(sql, [feedbackID]);
        return rows[0];
    }
    async updateFeedback(feedbackID, data) {
        const sql = `
      UPDATE Feedback
      SET CustomerID = $1, Name = $2, Comments = $3, Response = $4, Rating = $5
      WHERE FeedbackID = $6
    `;
        const res = await (0, db_1.query)(sql, [
            data.CustomerID,
            data.Name,
            data.Comments ?? null,
            data.Response ?? null,
            data.Rating,
            feedbackID,
        ]);
        return { message: "Feedback updated", affectedRows: res.rowCount || 0 };
    }
    async deleteFeedback(feedbackID) {
        const sql = `DELETE FROM Feedback WHERE FeedbackID = $1`;
        const res = await (0, db_1.query)(sql, [feedbackID]);
        return { message: "Feedback deleted", affectedRows: res.rowCount || 0 };
    }
}
exports.default = FeedbackModel;
