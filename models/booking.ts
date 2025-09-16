// models/booking.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { BookingRow, BookingPayload } from "../interfaces/services";

/**
 * BookingModel
 * Handles CRUD for the Booking table
 */
export default class BookingModel {
  constructor() {}

  /**
   * Create a new booking record
   */
  async createBooking(
    payload: BookingPayload
  ): Promise<{ message: string; bookingID: number }> {
    const sql = `
      INSERT INTO Booking
        (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      payload.Genre,
      payload.BookingDate,
      payload.Cost,
      payload.Hours,
      payload.ServiceID,
      payload.BookStatus,
    ]);

    return {
      message: "Booking record created successfully",
      bookingID: result.insertId,
    };
  }

  /**
   * Fetch all booking records
   */
  async getAllBookings(): Promise<BookingRow[]> {
    const sql = `SELECT * FROM Booking`;
    const [rows] = await db.execute<BookingRow[]>(sql);
    return rows;
  }

  /**
   * Fetch a single booking by ID
   */
  async getBookingById(bookingID: number): Promise<BookingRow | undefined> {
    const sql = `SELECT * FROM Booking WHERE BookingID = ?`;
    const [rows] = await db.execute<BookingRow[]>(sql, [bookingID]);
    return rows[0];
  }

  /**
   * Update an existing booking record
   */
  async updateBooking(
    bookingID: number,
    data: Partial<BookingPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Booking
      SET Genre = ?, BookingDate = ?, Cost = ?, Hours = ?, ServiceID = ?, BookStatus = ?
      WHERE BookingID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Genre,
      data.BookingDate,
      data.Cost,
      data.Hours,
      data.ServiceID,
      data.BookStatus,
      bookingID,
    ]);

    return {
      message: "Booking record updated",
      affectedRows: result.affectedRows,
    };
  }

  /**
   * Delete a booking by ID
   */
  async deleteBooking(
    bookingID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Booking WHERE BookingID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [bookingID]);
    return { message: "Booking record deleted", affectedRows: result.affectedRows };
  }
}
