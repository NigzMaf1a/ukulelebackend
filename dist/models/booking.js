"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class BookingModel {
    constructor() { }
    async createBooking(payload) {
        const sql = `
      INSERT INTO Booking
        (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
        const res = await (0, db_1.query)(sql, [
            payload.Genre,
            payload.BookingDate,
            payload.Cost,
            payload.Hours,
            payload.ServiceID,
            payload.BookStatus,
        ]);
        return { message: "Booking record created successfully", affectedRows: res.rowCount || 0 };
    }
    async getAllBookings() {
        const sql = `SELECT * FROM Booking`;
        return await (0, db_1.query)(sql);
    }
    async getBookingById(bookingID) {
        const sql = `SELECT * FROM Booking WHERE BookingID = $1`;
        const rows = await (0, db_1.query)(sql, [bookingID]);
        return rows[0];
    }
    async updateBooking(bookingID, data) {
        const sql = `
      UPDATE Booking
      SET Genre = $1, BookingDate = $2, Cost = $3, Hours = $4, ServiceID = $5, BookStatus = $6
      WHERE BookingID = $7
    `;
        const res = await (0, db_1.query)(sql, [
            data.Genre,
            data.BookingDate,
            data.Cost,
            data.Hours,
            data.ServiceID,
            data.BookStatus,
            bookingID,
        ]);
        return { message: `Booking ${bookingID} updated`, affectedRows: res.rowCount || 0 };
    }
    async deleteBooking(bookingID) {
        const sql = `DELETE FROM Booking WHERE BookingID = $1`;
        const res = await (0, db_1.query)(sql, [bookingID]);
        return { message: `Booking ${bookingID} deleted`, affectedRows: res.rowCount || 0 };
    }
}
exports.default = BookingModel;
