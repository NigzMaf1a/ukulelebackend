import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { BookingRow } from "../interfaces/band";

export default class Band {
    constructor() {}

    // Get all bookings where BookStatus = 'Untick'
    async getUntickedBookings(): Promise<BookingRow[]> {
        const sql = `SELECT * FROM Booking WHERE BookStatus = 'Untick'`;
        const [rows] = await db.execute<BookingRow[]>(sql);
        return rows;
    }

    // Update a booking to mark BookStatus = 'Tick' by BookingID
    async updateBookingStatus(bookingID: number): Promise<boolean> {
        const sql = `UPDATE Booking SET BookStatus = 'Tick' WHERE BookingID = ?`;
        const [result] = await db.execute<ResultSetHeader>(sql, [bookingID]);
        return result.affectedRows > 0; // returns true if updated
    }
}
