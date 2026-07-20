import { query } from "../utils/db";
import {
  ServicesRow,
  ServicesPayload,
  LendingPayload,
  BookingPayload,
} from "../interfaces/services";

export default class ServicesModel {
  constructor() { }

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
      payload.customerid,
      payload.genre,
      payload.cost,
      payload.hours,
      payload.servicetype,
      "Pending",
      "Not Paid",
    ]);
    const serviceID = serviceRows[0].ServiceID;

    // Auto-insert into Lending or Booking
    if (payload.servicetype === "Lending") {
      const lendingSql = `
        INSERT INTO Lending
          (Genre, LendingDate, Cost, Hours, ServiceID, LendingStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
      const lendingData: LendingPayload = {
        genre: payload.genre,
        lendingdate: new Date(),
        cost: payload.cost,
        hours: payload.hours,
        serviceid: serviceID,
        lendingstatus: "Yet",
        performed: "No",
      };
      await query(lendingSql, [
        lendingData.genre,
        lendingData.cost,
        lendingData.hours,
        lendingData.serviceid,
        lendingData.lendingstatus,
        lendingData.performed,
      ]);
    } else if (payload.servicetype === "Booking") {
      const bookingSql = `
        INSERT INTO Booking
          (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
      const bookingData: BookingPayload = {
        genre: payload.genre,
        bookingdate: new Date(),
        cost: payload.cost,
        hours: payload.hours,
        serviceid: serviceID,
        bookstatus: "Untick",
        performed: "No"
      };
      await query(bookingSql, [
        bookingData.genre,
        bookingData.cost,
        bookingData.hours,
        bookingData.serviceid,
        bookingData.bookstatus,
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
    serviceID: number
  ): Promise<{ message: string }> {
    const sql = `
    UPDATE Services
    SET ServiceStatus = 'Approved'
    WHERE ServiceID = $1
  `;

    await query(sql, [serviceID]);

    return {
      message: "Service status updated"
    };
  }

  /** Update payment status only */
  async updatePaymentStatus(
    serviceID: number
  ): Promise<{ message: string }> {
    const sql = `
    UPDATE Services
    SET PaymentStatus = 'Paid'
    WHERE ServiceID = $1
  `;

    await query(sql, [serviceID]);

    return {
      message: "Payment status updated"
    };
  }

  /** Delete service */
  async deleteService(serviceID: number): Promise<{ message: string }> {
    const sql = `DELETE FROM Services WHERE ServiceID = $1`;
    await query(sql, [serviceID]);
    return { message: "Service deleted" };
  }
}