import { query } from "../utils/db";
import { BookingPayload } from "../interfaces/services";
import { BookingRow } from "../interfaces/services";

export default class BookingModel {
  constructor() { }

  async createBooking(
    payload: BookingPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      INSERT INTO Booking
        (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const res = await query(sql, [
      payload.genre,
      payload.bookingdate,
      payload.cost,
      payload.hours,
      payload.serviceid,
      payload.bookstatus,
    ]);
    return { message: "Booking record created successfully", affectedRows: (res as any).rowCount || 0 };
  }

  async getAllBookings(): Promise<BookingRow[]> {
    const sql = `SELECT * FROM Booking`;
    return await query<BookingRow>(sql);
  }

  async getBookingById(bookingID: number): Promise<BookingRow | undefined> {
    const sql = `SELECT * FROM Booking WHERE BookingID = $1`;
    const rows = await query<BookingRow>(sql, [bookingID]);
    return rows[0];
  }

  async updateBooking(
    bookingID: number,
    data: Pick<BookingPayload, "bookstatus" | "performed">
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
    UPDATE Booking
    SET BookStatus = $1,
        Performed = $2
    WHERE BookingID = $3
  `;

    const res = await query(sql, [
      data.bookstatus,
      data.performed,
      bookingID,
    ]);

    return {
      message: `Booking ${bookingID} updated`,
      affectedRows: (res as any).rowCount || 0,
    };
  }

  async deleteBooking(
    bookingID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Booking WHERE BookingID = $1`;
    const res = await query(sql, [bookingID]);
    return { message: `Booking ${bookingID} deleted`, affectedRows: (res as any).rowCount || 0 };
  }
}