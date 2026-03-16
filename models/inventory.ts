import { query } from "../utils/db";
import { InventoryRow, InventoryPayload } from "../interfaces/inventory";

export default class InventoryModel {
  constructor() {}

  async createInventory(
    data: InventoryPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Inventory
        (Price, Description, PurchaseDate, Condition, Availability)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING EquipmentID
    `;
    const rows = await query<{ EquipmentID: number }>(sql, [
      data.Price,
      data.Description,
      data.PurchaseDate,
      data.Condition,
      data.Availability,
    ]);
    return { message: "Inventory record created", id: rows[0].EquipmentID };
  }

  async readInventory(): Promise<InventoryRow[]> {
    const sql = `SELECT * FROM Inventory`;
    return await query<InventoryRow>(sql);
  }

  async updateInventory(
    equipmentID: number,
    data: InventoryPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Inventory
      SET Price = $1, Description = $2, PurchaseDate = $3, Condition = $4, Availability = $5
      WHERE EquipmentID = $6
    `;
    const res = await query(sql, [
      data.Price,
      data.Description,
      data.PurchaseDate,
      data.Condition,
      data.Availability,
      equipmentID,
    ]);
    return { message: "Inventory record updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteInventory(
    equipmentID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Inventory WHERE EquipmentID = $1`;
    const res = await query(sql, [equipmentID]);
    return { message: "Inventory record deleted", affectedRows: (res as any).rowCount || 0 };
  }

  async getInventoryData(
    equipmentID: number
  ): Promise<InventoryRow | undefined> {
    const sql = `SELECT * FROM Inventory WHERE EquipmentID = $1`;
    const rows = await query<InventoryRow>(sql, [equipmentID]);
    return rows[0];
  }
}