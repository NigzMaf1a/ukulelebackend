import { query } from "../utils/db";
import { BookingRow } from "../interfaces/band";

export default class Band {
  constructor() {}

  async getUntickedBookings(): Promise<BookingRow[]> {
    const sql = `SELECT * FROM Booking WHERE BookStatus = 'Untick'`;
    return await query<BookingRow>(sql);
  }

  async updateBookingStatus(bookingID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE Booking SET BookStatus = 'Tick' WHERE BookingID = $1`;
    const res = await query(sql, [bookingID]);
    return { message: `Booking ${bookingID} marked as Tick`, affectedRows: (res as any).rowCount || 0 };
  }
}