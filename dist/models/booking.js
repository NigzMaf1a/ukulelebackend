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
            payload.genre,
            payload.bookingdate,
            payload.cost,
            payload.hours,
            payload.serviceid,
            payload.bookstatus,
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
    SET BookStatus = $1,
        Performed = $2
    WHERE BookingID = $3
  `;
        const res = await (0, db_1.query)(sql, [
            data.bookstatus,
            data.performed,
            bookingID,
        ]);
        return {
            message: `Booking ${bookingID} updated`,
            affectedRows: res.rowCount || 0,
        };
    }
    async deleteBooking(bookingID) {
        const sql = `DELETE FROM Booking WHERE BookingID = $1`;
        const res = await (0, db_1.query)(sql, [bookingID]);
        return { message: `Booking ${bookingID} deleted`, affectedRows: res.rowCount || 0 };
    }
}
exports.default = BookingModel;
