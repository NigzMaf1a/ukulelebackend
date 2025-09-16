// models/Inspector.ts
import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { InspectorRow, InspectorPayload } from "../interfaces/inspector";

export default class Inspector {
  constructor() {}

  /**
   * Create a new inspection record
   */
  async createInspector(
    data: InspectorPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Inspector
        (EquipmentID, InspectionDate, InspectorName, Condition)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.InspectionDate,
      data.InspectorName,
      data.Condition,
    ]);

    return { message: "Inspection created", id: result.insertId };
  }

  /**
   * Read all inspection records
   */
  async readInspectors(): Promise<InspectorRow[]> {
    const sql = `SELECT * FROM Inspector`;
    const [rows] = await db.execute<InspectorRow[]>(sql);
    return rows;
  }

  /**
   * Update an inspection record
   */
  async updateInspector(
    inspectionID: number,
    data: InspectorPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Inspector
      SET EquipmentID = ?, InspectionDate = ?, InspectorName = ?, Condition = ?
      WHERE InspectionID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.InspectionDate,
      data.InspectorName,
      data.Condition,
      inspectionID,
    ]);

    return { message: "Inspection updated", affectedRows: result.affectedRows };
  }

  /**
   * Delete an inspection record
   */
  async deleteInspector(
    inspectionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Inspector WHERE InspectionID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [inspectionID]);
    return { message: "Inspection deleted", affectedRows: result.affectedRows };
  }

  /**
   * Get one inspection record by ID
   */
  async getInspectorData(
    inspectionID: number
  ): Promise<InspectorRow | undefined> {
    const sql = `SELECT * FROM Inspector WHERE InspectionID = ?`;
    const [rows] = await db.execute<InspectorRow[]>(sql, [inspectionID]);
    return rows[0];
  }
}
