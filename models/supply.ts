import { query } from "../utils/db";
import { SupplyRow, SupplyPayload } from "../interfaces/supply";

export default class SupplyModel {
  constructor() {}

  /**
   * Create a new supply record
   */
  async createSupply(data: SupplyPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Supply
        (Price, SupplierName, SupplyDate, PhoneNo, SupplyStatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING SupplyID
    `;
    const rows = await query<{ SupplyID: number }>(sql, [
      data.Price,
      data.SupplierName,
      data.SupplyDate,
      data.PhoneNo,
      data.SupplyStatus,
    ]);
    return { message: "Supply record created", id: rows[0].SupplyID };
  }

  /**
   * Read all supply records
   */
  async readSupplies(): Promise<SupplyRow[]> {
    const sql = `SELECT * FROM Supply`;
    return await query<SupplyRow>(sql);
  }

  /**
   * Get one supply record by ID
   */
  async getSupplyData(supplyID: number): Promise<SupplyRow | undefined> {
    const sql = `SELECT * FROM Supply WHERE SupplyID = $1`;
    const rows = await query<SupplyRow>(sql, [supplyID]);
    return rows[0];
  }

  /**
   * Update an existing supply record
   */
  async updateSupply(
    supplyID: number,
    data: Partial<SupplyPayload>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Supply
      SET Price = $1, SupplierName = $2, SupplyDate = $3, PhoneNo = $4, SupplyStatus = $5
      WHERE SupplyID = $6
    `;
    const res = await query(sql, [
      data.Price,
      data.SupplierName,
      data.SupplyDate,
      data.PhoneNo,
      data.SupplyStatus,
      supplyID,
    ]);
    return { message: "Supply record updated", affectedRows: (res as any).rowCount || 0 };
  }

  /**
   * Delete a supply record
   */
  async deleteSupply(supplyID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Supply WHERE SupplyID = $1`;
    const res = await query(sql, [supplyID]);
    return { message: "Supply record deleted", affectedRows: (res as any).rowCount || 0 };
  }
}