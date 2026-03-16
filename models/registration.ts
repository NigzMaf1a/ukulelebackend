import { query } from "../utils/db";
import { RegistrationRow, RegistrationPayload } from "../interfaces/registration";

export default class RegistrationModel {
  constructor() {}

  /**
   * Create a new registration record
   */
  async createRegistration(
    data: RegistrationPayload
  ): Promise<{ message: string; regID: number }> {
    const sql = `
      INSERT INTO Registration
        (Name, PhoneNo, Email, Password, Gender, RegType, dLocation, Photo, accStatus, lastAccessed)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING RegID
    `;
    const rows = await query<{ RegID: number }>(sql, [
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
    ]);
    return { message: "Registration created", regID: rows[0].RegID };
  }

  /**
   * Read all registration records
   */
  async readRegistrations(): Promise<RegistrationRow[]> {
    const sql = `SELECT * FROM Registration`;
    return await query<RegistrationRow>(sql);
  }

  /**
   * Get a single registration by RegID
   */
  async getRegistration(regID: number): Promise<RegistrationRow | undefined> {
    const sql = `SELECT * FROM Registration WHERE RegID = $1`;
    const rows = await query<RegistrationRow>(sql, [regID]);
    return rows[0];
  }

  /**
   * Update a registration fully
   */
  async updateRegistration(
    regID: number,
    data: Partial<RegistrationPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Registration
      SET Name = $1, PhoneNo = $2, Email = $3, Password = $4, Gender = $5, RegType = $6,
          dLocation = $7, Photo = $8, accStatus = $9, lastAccessed = $10
      WHERE RegID = $11
    `;
    const res = await query(sql, [
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
    return { message: "Registration updated", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Delete a registration record
   */
  async deleteRegistration(regID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Registration WHERE RegID = $1`;
    const res = await query(sql, [regID]);
    return { message: "Registration deleted", affectedRows: (res as any).rowCount || 0 };
  }
}