import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { MemberRow, MemberPayload } from "../interfaces/member";
import { RegistrationPayload, RegistrationRow } from "../interfaces/registration";

/**
 * Member model
 * Handles Registration + Member inserts and joins
 */
export default class Member {
  constructor() {}

  /**
   * Create a Registration record and its matching Member record.
   * Returns both IDs.
   */
  async createMemberWithRegistration(
    regData: RegistrationPayload,
    memberType: MemberPayload["Type"],
    paymentStatus: MemberPayload["PaymentStatus"]
  ): Promise<{ message: string; regID: number; memberID: number }> {
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

      // Insert into Member (FK RegID)
      const memSql = `
        INSERT INTO Member
          (RegID, Type, Name, PhoneNo, PaymentStatus)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [memResult] = await connection.execute<ResultSetHeader>(memSql, [
        regID,
        memberType,
        regData.Name,
        regData.PhoneNo,
        paymentStatus,
      ]);

      await connection.commit();
      return {
        message: "Member + Registration created",
        regID,
        memberID: memResult.insertId,
      };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  /**
   * Read all members with their registration info
   */
  async readMembersWithRegistration(): Promise<
    (MemberRow & Partial<RegistrationRow>)[]
  > {
    const sql = `
      SELECT m.*, r.*
      FROM Member m
      JOIN Registration r ON m.RegID = r.RegID
    `;
    const [rows] = await db.execute<(MemberRow & RegistrationRow)[]>(sql);
    return rows;
  }

  /**
   * Fetch a single member with registration info
   */
  async getMemberData(
    memberID: number
  ): Promise<(MemberRow & RegistrationRow) | undefined> {
    const sql = `
      SELECT m.*, r.*
      FROM Member m
      JOIN Registration r ON m.RegID = r.RegID
      WHERE m.MemberID = ?
    `;
    const [rows] = await db.execute<(MemberRow & RegistrationRow)[]>(sql, [
      memberID,
    ]);
    return rows[0];
  }

  /**
   * Update member table only
   */
  async updateMember(
    memberID: number,
    data: MemberPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Member
      SET RegID = ?, Type = ?, Name = ?, PhoneNo = ?, PaymentStatus = ?
      WHERE MemberID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.RegID,
      data.Type,
      data.Name,
      data.PhoneNo,
      data.PaymentStatus,
      memberID,
    ]);
    return { message: "Member updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a member (does NOT remove Registration row)
   */
  async deleteMember(
    memberID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Member WHERE MemberID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [memberID]);
    return { message: "Member deleted", affectedRows: result.affectedRows };
  }
}
