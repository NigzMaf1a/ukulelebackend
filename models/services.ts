// models/services.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import {
  ServicesRow,
  ServicesPayload,
} from "../interfaces/services";

/**
 * Services model
 * Handles CRUD for the Services table
 */
export default class ServicesModel {
  constructor() {}

  /**
   * Create a new service
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

    return {
      message: "Service created successfully",
      serviceID: result.insertId,
    };
  }

  /**
   * Fetch all services
   */
  async getAllServices(): Promise<ServicesRow[]> {
    const sql = `SELECT * FROM Services`;
    const [rows] = await db.execute<ServicesRow[]>(sql);
    return rows;
  }

  /**
   * Fetch a single service by ID
   */
  async getServiceById(serviceID: number): Promise<ServicesRow | undefined> {
    const sql = `SELECT * FROM Services WHERE ServiceID = ?`;
    const [rows] = await db.execute<ServicesRow[]>(sql, [serviceID]);
    return rows[0];
  }

  /**
   * Full update (all fields)
   * ⚠️ Use with caution — for admin-level changes.
   */
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

  /**
   * Update only the ServiceStatus
   * (Action: Service Manager)
   */
  async updateServiceStatus(
    serviceID: number,
    status: ServicesRow["ServiceStatus"]
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Services
      SET ServiceStatus = ?
      WHERE ServiceID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [status, serviceID]);
    return { message: "ServiceStatus updated", affectedRows: result.affectedRows };
  }

  /**
   * Update only the PaymentStatus
   * (Action: Accountant)
   */
  async updatePaymentStatus(
    serviceID: number,
    payment: ServicesRow["PaymentStatus"]
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Services
      SET PaymentStatus = ?
      WHERE ServiceID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [payment, serviceID]);
    return { message: "PaymentStatus updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a service by ID
   */
  async deleteService(
    serviceID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Services WHERE ServiceID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [serviceID]);
    return { message: "Service deleted", affectedRows: result.affectedRows };
  }
}
