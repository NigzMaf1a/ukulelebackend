import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { RegistrationPayload, RegistrationRow } from "../interfaces/registration";
import { CustomerPayload, CustomerRow } from "../interfaces/customer";

/**
 * Customer model
 * Handles Registration + Customer inserts and joins
 */
export default class Customer {
  constructor() {}

  /**
   * Create a Registration record and its matching Customer record.
   * Returns both IDs.
   */
  async createCustomerWithRegistration(
    regData: RegistrationPayload
  ): Promise<{ message: string; regID: number; customerID: number }> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert into Registration
      const regSql = `
        INSERT INTO Registration
          (Name, PhoneNo, Email, Password, Gender, RegType, dLocation, Photo, accStatus, lastAccessed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [regResult] = await connection.execute<ResultSetHeader>(regSql, [
        regData.Name,
        regData.PhoneNo,
        regData.Email,
        regData.Password,
        regData.Gender,
        regData.RegType,
        regData.dLocation,
        regData.Photo ?? null,
        regData.accStatus ?? "Pending",
        regData.lastAccessed ?? new Date(),
      ]);

      const regID = regResult.insertId;

      // Insert into Customer (RegID FK)
      const custSql = `
        INSERT INTO Customer
          (RegID, Name, Email, PhoneNo)
        VALUES (?, ?, ?, ?)
      `;
      const [custResult] = await connection.execute<ResultSetHeader>(custSql, [
        regID,
        regData.Name,
        regData.Email,
        regData.PhoneNo,
      ]);

      await connection.commit();
      return {
        message: "Customer + Registration created",
        regID,
        customerID: custResult.insertId,
      };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  /**
   * Read all customers (with Registration join)
   */
  async readCustomersWithRegistration(): Promise<
    (CustomerRow & Partial<RegistrationRow>)[]
  > {
    const sql = `
      SELECT c.*, r.*
      FROM Customer c
      JOIN Registration r ON c.RegID = r.RegID
    `;
    const [rows] = await db.execute<(CustomerRow & RegistrationRow)[]>(sql);
    return rows;
  }

  /**
   * Fetch a single customer + registration info
   */
  async getCustomerData(
    customerID: number
  ): Promise<(CustomerRow & RegistrationRow) | undefined> {
    const sql = `
      SELECT c.*, r.*
      FROM Customer c
      JOIN Registration r ON c.RegID = r.RegID
      WHERE c.CustomerID = ?
    `;
    const [rows] = await db.execute<(CustomerRow & RegistrationRow)[]>(sql, [
      customerID,
    ]);
    return rows[0];
  }

  /**
   * Update customer table only
   */
  async updateCustomer(
    customerID: number,
    data: CustomerPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Customer
      SET RegID = ?, Name = ?, Email = ?, PhoneNo = ?
      WHERE CustomerID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.RegID,
      data.Name,
      data.Email,
      data.PhoneNo,
      customerID,
    ]);
    return { message: "Customer updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a customer (does NOT remove Registration row)
   */
  async deleteCustomer(
    customerID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Customer WHERE CustomerID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [customerID]);
    return { message: "Customer deleted", affectedRows: result.affectedRows };
  }
}
