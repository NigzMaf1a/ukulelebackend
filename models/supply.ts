// models/Supply.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { SupplyRow, SupplyPayload } from "../interfaces/supply";

export default class Supply {
  constructor() {}

  /**
   * Create a new supply record
   */
  async createSupply(
    data: SupplyPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Supply
        (Price, SupplierName, SupplyDate, PhoneNo, SupplyStatus)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Price,
      data.SupplierName,
      data.SupplyDate,
      data.PhoneNo,
      data.SupplyStatus,
    ]);

    return { message: "Supply record created", id: result.insertId };
  }

  /**
   * Read all supply records
   */
  async readSupplies(): Promise<SupplyRow[]> {
    const sql = `SELECT * FROM Supply`;
    const [rows] = await db.execute<SupplyRow[]>(sql);
    return rows;
  }

  /**
   * Update an existing supply record
   */
  async updateSupply(
    supplyID: number,
    data: SupplyPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Supply
      SET Price = ?, SupplierName = ?, SupplyDate = ?, PhoneNo = ?, SupplyStatus = ?
      WHERE SupplyID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Price,
      data.SupplierName,
      data.SupplyDate,
      data.PhoneNo,
      data.SupplyStatus,
      supplyID,
    ]);

    return { message: "Supply record updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete a supply record
   */
  async deleteSupply(
    supplyID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Supply WHERE SupplyID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [supplyID]);
    return { message: "Supply record deleted", affectedRows: result.affectedRows };
  }

  /**
   * Get one supply record by ID
   */
  async getSupplyData(
    supplyID: number
  ): Promise<SupplyRow | undefined> {
    const sql = `SELECT * FROM Supply WHERE SupplyID = ?`;
    const [rows] = await db.execute<SupplyRow[]>(sql, [supplyID]);
    return rows[0];
  }
}
