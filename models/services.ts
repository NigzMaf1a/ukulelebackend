import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import {
  ServicesRow,
  ServicesPayload,
  LendingPayload,
  BookingPayload,
} from "../interfaces/services";

/**
 * Services model
 * Handles CRUD for the Services table
 * Also auto-inserts Lending or Booking based on ServiceType
 */
export default class ServicesModel {
  constructor() {}

  /**
   * Create a new service and auto-insert Lending or Booking record
   * Defaults:
   *  - ServiceStatus = "Pending"
   *  - PaymentStatus = "Not Paid"
   */
  async createService(
    payload: ServicesPayload
  ): Promise<{ message: string; serviceID: number }> {
    const sql = `
      INSERT INTO Services
        (CustomerID, Genre, Cost, Hours, ServiceType, ServiceStatus, PaymentStatus)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      payload.CustomerID,
      payload.Genre,
      payload.Cost,
      payload.Hours,
      payload.ServiceType,
      "Pending",
      "Not Paid",
    ]);

    const serviceID = result.insertId;

    // Auto insert to Lending or Booking
    if (payload.ServiceType === "Lending") {
      const lendingSql = `
        INSERT INTO Lending
          (Genre, LendingDate, Cost, Hours, ServiceID, LendingStatus, Performed)
        VALUES (?, NOW(), ?, ?, ?, ?, ?)
      `;
      const lendingData: LendingPayload = {
        Genre: payload.Genre,
        LendingDate: new Date(),
        Cost: payload.Cost,
        Hours: payload.Hours,
        ServiceID: serviceID,
        LendingStatus: "Yet",
        Performed: "No",
      };
      await db.execute<ResultSetHeader>(lendingSql, [
        lendingData.Genre,
        lendingData.Cost,
        lendingData.Hours,
        lendingData.ServiceID,
        lendingData.LendingStatus,
        lendingData.Performed,
      ]);
    } else if (payload.ServiceType === "Booking") {
      const bookingSql = `
        INSERT INTO Booking
          (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus, Performed)
        VALUES (?, NOW(), ?, ?, ?, ?, ?)
      `;
      const bookingData: BookingPayload = {
        Genre: payload.Genre,
        BookingDate: new Date(),
        Cost: payload.Cost,
        Hours: payload.Hours,
        ServiceID: serviceID,
        BookStatus: "Untick",
      };
      await db.execute<ResultSetHeader>(bookingSql, [
        bookingData.Genre,
        bookingData.Cost,
        bookingData.Hours,
        bookingData.ServiceID,
        bookingData.BookStatus,
        "No",
      ]);
    }

    return {
      message: "Service created successfully",
      serviceID,
    };
  }

  /** Fetch all services */
  async getAllServices(): Promise<ServicesRow[]> {
    const sql = `SELECT * FROM Services`;
    const [rows] = await db.execute<ServicesRow[]>(sql);
    return rows;
  }

  /** Fetch single service by ID */
  async getServiceById(serviceID: number): Promise<ServicesRow | undefined> {
    const sql = `SELECT * FROM Services WHERE ServiceID = ?`;
    const [rows] = await db.execute<ServicesRow[]>(sql, [serviceID]);
    return rows[0];
  }

  /** Update service */
  async updateService(
    serviceID: number,
    data: Partial<ServicesPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Services
      SET CustomerID = ?, Genre = ?, Cost = ?, Hours = ?, ServiceType = ?,
          ServiceStatus = ?, PaymentStatus = ?
      WHERE ServiceID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.CustomerID,
      data.Genre,
      data.Cost,
      data.Hours,
      data.ServiceType,
      data.ServiceStatus,
      data.PaymentStatus,
      serviceID,
    ]);

    return { message: "Service updated", affectedRows: result.affectedRows };
  }

  /** Update service status only */
  async updateServiceStatus(
    serviceID: number,
    status: ServicesRow["ServiceStatus"]
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE Services SET ServiceStatus = ? WHERE ServiceID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [status, serviceID]);
    return { message: "ServiceStatus updated", affectedRows: result.affectedRows };
  }

  /** Update payment status only */
  async updatePaymentStatus(
    serviceID: number,
    payment: ServicesRow["PaymentStatus"]
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE Services SET PaymentStatus = ? WHERE ServiceID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [payment, serviceID]);
    return { message: "PaymentStatus updated", affectedRows: result.affectedRows };
  }

  /** Delete service */
  async deleteService(
    serviceID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Services WHERE ServiceID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [serviceID]);
    return { message: "Service deleted", affectedRows: result.affectedRows };
  }
}