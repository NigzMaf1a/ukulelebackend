"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class Band {
    constructor() { }
    async getUntickedBookings() {
        const sql = `SELECT * FROM Booking WHERE BookStatus = 'Untick'`;
        return await (0, db_1.query)(sql);
    }
    async updateBookingStatus(bookingID) {
        const sql = `UPDATE Booking SET BookStatus = 'Tick' WHERE BookingID = $1`;
        const res = await (0, db_1.query)(sql, [bookingID]);
        return { message: `Booking ${bookingID} marked as Tick`, affectedRows: res.rowCount || 0 };
    }
}
exports.default = Band;
