// models/Inventory.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { InventoryRow, InventoryPayload } from "../interfaces/inventory";

export default class Inventory {
  constructor() {}

  /**
   * Create a new inventory record
   */
  async createInventory(
    data: InventoryPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Inventory
        (Price, Description, PurchaseDate, Condition, Availability)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Price,
      data.Description,
      data.PurchaseDate,
      data.Condition,
      data.Availability,
    ]);

    return { message: "Inventory record created", id: result.insertId };
  }

  /**
   * Get all inventory records
   */
  async readInventory(): Promise<InventoryRow[]> {
    const sql = `SELECT * FROM Inventory`;
    const [rows] = await db.execute<InventoryRow[]>(sql);
    return rows;
  }

  /**
   * Update an existing inventory record
   */
  async updateInventory(
    equipmentID: number,
    data: InventoryPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Inventory
      SET Price = ?, Description = ?, PurchaseDate = ?, Condition = ?, Availability = ?
      WHERE EquipmentID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Price,
      data.Description,
      data.PurchaseDate,
      data.Condition,
      data.Availability,
      equipmentID,
    ]);

    return { message: "Inventory record updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete an inventory record
   */
  async deleteInventory(
    equipmentID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Inventory WHERE EquipmentID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [equipmentID]);
    return { message: "Inventory record deleted", affectedRows: result.affectedRows };
  }

  /**
   * Fetch one inventory record by ID
   */
  async getInventoryData(
    equipmentID: number
  ): Promise<InventoryRow | undefined> {
    const sql = `SELECT * FROM Inventory WHERE EquipmentID = ?`;
    const [rows] = await db.execute<InventoryRow[]>(sql, [equipmentID]);
    return rows[0];
  }
}
