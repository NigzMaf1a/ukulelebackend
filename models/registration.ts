import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import {
  RegistrationPayload,
  RegistrationRow,
} from "../interfaces/registration";
import { CustomerRow } from "../interfaces/customer";
import { MemberRow } from "../interfaces/member";

export default class Registration {
  constructor() {}

  /**
   * Create a registration + linked Customer/Member record
   */
  async createRegistration(
    regData: RegistrationPayload
  ): Promise<{ message: string; regID: number; linkedID: number }> {
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
      let linkedID = 0;

      if (regData.RegType === "Customer") {
        // Insert into Customer
        const custSql = `
          INSERT INTO Customer (RegID, Name, Email, PhoneNo)
          VALUES (?, ?, ?, ?)
        `;
        const [custResult] = await connection.execute<ResultSetHeader>(
          custSql,
          [regID, regData.Name, regData.Email, regData.PhoneNo]
        );
        linkedID = custResult.insertId;
      } else {
        // Insert into Member
        const memSql = `
          INSERT INTO Member (RegID, Type, Name, PhoneNo, PaymentStatus)
          VALUES (?, ?, ?, ?, ?)
        `;
        const [memResult] = await connection.execute<ResultSetHeader>(
          memSql,
          [regID, regData.RegType, regData.Name, regData.PhoneNo, "Not Paid"]
        );
        linkedID = memResult.insertId;
      }

      await connection.commit();
      return {
        message: "Registration created",
        regID,
        linkedID,
      };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  /**
   * Read all registrations + linked data
   */
  async readRegistrations(): Promise<(RegistrationRow & Partial<CustomerRow> & Partial<MemberRow>)[]> {
    const sql = `
      SELECT r.*, c.CustomerID, m.MemberID, m.Type, m.PaymentStatus
      FROM Registration r
      LEFT JOIN Customer c ON r.RegID = c.RegID
      LEFT JOIN Member m ON r.RegID = m.RegID
    `;
    const [rows] = await db.execute<
      (RegistrationRow & Partial<CustomerRow> & Partial<MemberRow>)[]
    >(sql);
    return rows;
  }

  /**
   * Get a single registration + linked data
   */
  async getRegistration(
    regID: number
  ): Promise<(RegistrationRow & Partial<CustomerRow> & Partial<MemberRow>) | undefined> {
    const sql = `
      SELECT r.*, c.CustomerID, m.MemberID, m.Type, m.PaymentStatus
      FROM Registration r
      LEFT JOIN Customer c ON r.RegID = c.RegID
      LEFT JOIN Member m ON r.RegID = m.RegID
      WHERE r.RegID = ?
    `;
    const [rows] = await db.execute<
      (RegistrationRow & Partial<CustomerRow> & Partial<MemberRow>)[]
    >(sql, [regID]);
    return rows[0];
  }

  /**
   * Update registration (full replace)
   */
  async updateRegistration(
    regID: number,
    data: RegistrationPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Registration
      SET Name = ?, PhoneNo = ?, Email = ?, Password = ?, Gender = ?, RegType = ?, 
          dLocation = ?, Photo = ?, accStatus = ?, lastAccessed = ?
      WHERE RegID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Name,
      data.PhoneNo,
      data.Email,
      data.Password,
      data.Gender,
      data.RegType,
      data.dLocation,
      data.Photo ?? null,
      data.accStatus ?? "Pending",
      data.lastAccessed ?? new Date(),
      regID,
    ]);
    return { message: "Registration updated", affectedRows: result.affectedRows };
  }

  /**
   * Patch registration (partial update)
   */
  async patchRegistration(
    regID: number,
    patchData: Partial<RegistrationPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const fields = Object.keys(patchData);
    if (fields.length === 0) {
      return { message: "No fields provided", affectedRows: 0 };
    }

    const setClause = fields.map((f) => `${f} = ?`).join(", ");
    const values = fields.map((f) => (patchData as any)[f]);
    values.push(regID);

    const sql = `UPDATE Registration SET ${setClause} WHERE RegID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, values);

    return { message: "Registration patched", affectedRows: result.affectedRows };
  }

  /**
   * Delete registration + linked Customer/Member
   */
  async deleteRegistration(
    regID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Delete from Customer
      await connection.execute(`DELETE FROM Customer WHERE RegID = ?`, [regID]);
      // Delete from Member
      await connection.execute(`DELETE FROM Member WHERE RegID = ?`, [regID]);
      // Delete from Registration
      const [result] = await connection.execute<ResultSetHeader>(
        `DELETE FROM Registration WHERE RegID = ?`,
        [regID]
      );

      await connection.commit();
      return { message: "Registration deleted", affectedRows: result.affectedRows };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}
