import { query } from "../utils/db";
import {
  ServicesRow,
  ServicesPayload,
  LendingPayload,
  BookingPayload,
} from "../interfaces/services";

export default class ServicesModel {
  constructor() {}

  /**
   * Create a service record and auto-insert Lending or Booking record
   */
  async createService(
    payload: ServicesPayload
  ): Promise<{ message: string; serviceID: number }> {
    // Insert into Services table
    const serviceSql = `
      INSERT INTO Services
        (CustomerID, Genre, Cost, Hours, ServiceType, ServiceStatus, PaymentStatus)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING ServiceID
    `;
    const serviceRows = await query<{ ServiceID: number }>(serviceSql, [
      payload.CustomerID,
      payload.Genre,
      payload.Cost,
      payload.Hours,
      payload.ServiceType,
      "Pending",
      "Not Paid",
    ]);
    const serviceID = serviceRows[0].ServiceID;

    // Auto-insert into Lending or Booking
    if (payload.ServiceType === "Lending") {
      const lendingSql = `
        INSERT INTO Lending
          (Genre, LendingDate, Cost, Hours, ServiceID, LendingStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
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
      await query(lendingSql, [
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
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
      const bookingData: BookingPayload = {
        Genre: payload.Genre,
        BookingDate: new Date(),
        Cost: payload.Cost,
        Hours: payload.Hours,
        ServiceID: serviceID,
        BookStatus: "Untick",
      };
      await query(bookingSql, [
        bookingData.Genre,
        bookingData.Cost,
        bookingData.Hours,
        bookingData.ServiceID,
        bookingData.BookStatus,
        "No",
      ]);
    }

    return { message: "Service created successfully", serviceID };
  }

  /** Fetch all services */
  async getAllServices(): Promise<ServicesRow[]> {
    const sql = `SELECT * FROM Services`;
    return query<ServicesRow>(sql);
  }

  /** Fetch single service by ID */
  async getServiceById(serviceID: number): Promise<ServicesRow | undefined> {
    const sql = `SELECT * FROM Services WHERE ServiceID = $1`;
    const rows = await query<ServicesRow>(sql, [serviceID]);
    return rows[0];
  }

  /** Update full service record */
  async updateService(
    serviceID: number,
    data: Partial<ServicesPayload>
  ): Promise<{ message: string }> {
    const fields = Object.keys(data);
    if (!fields.length) return { message: "No fields to update" };

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = fields.map((f) => (data as any)[f]);
    values.push(serviceID);

    const sql = `UPDATE Services SET ${setClause} WHERE ServiceID = $${values.length}`;
    await query(sql, values);
    return { message: "Service updated" };
  }

  /** Update service status only */
  async updateServiceStatus(
    serviceID: number,
    status: ServicesRow["ServiceStatus"]
  ): Promise<{ message: string }> {
    const sql = `UPDATE Services SET ServiceStatus = $1 WHERE ServiceID = $2`;
    await query(sql, [status, serviceID]);
    return { message: "ServiceStatus updated" };
  }

  /** Update payment status only */
  async updatePaymentStatus(
    serviceID: number,
    payment: ServicesRow["PaymentStatus"]
  ): Promise<{ message: string }> {
    const sql = `UPDATE Services SET PaymentStatus = $1 WHERE ServiceID = $2`;
    await query(sql, [payment, serviceID]);
    return { message: "PaymentStatus updated" };
  }

  /** Delete service */
  async deleteService(serviceID: number): Promise<{ message: string }> {
    const sql = `DELETE FROM Services WHERE ServiceID = $1`;
    await query(sql, [serviceID]);
    return { message: "Service deleted" };
  }
}