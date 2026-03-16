import { query } from "../utils/db";
import { InspectorRow, InspectorPayload } from "../interfaces/inspector";

export default class InspectorModel {
  constructor() {}

  async createInspector(
    data: InspectorPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Inspector
        (EquipmentID, InspectionDate, InspectorName, Condition)
      VALUES ($1, $2, $3, $4)
      RETURNING InspectionID
    `;
    const rows = await query<{ InspectionID: number }>(sql, [
      data.EquipmentID,
      data.InspectionDate,
      data.InspectorName,
      data.Condition,
    ]);
    return { message: "Inspection created", id: rows[0].InspectionID };
  }

  async readInspectors(): Promise<InspectorRow[]> {
    const sql = `SELECT * FROM Inspector`;
    return await query<InspectorRow>(sql);
  }

  async updateInspector(
    inspectionID: number,
    data: InspectorPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Inspector
      SET EquipmentID = $1, InspectionDate = $2, InspectorName = $3, Condition = $4
      WHERE InspectionID = $5
    `;
    const res = await query(sql, [
      data.EquipmentID,
      data.InspectionDate,
      data.InspectorName,
      data.Condition,
      inspectionID,
    ]);
    return { message: "Inspection updated", affectedRows: (res as any).rowCount || 0 };
  }

  async deleteInspector(
    inspectionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Inspector WHERE InspectionID = $1`;
    const res = await query(sql, [inspectionID]);
    return { message: "Inspection deleted", affectedRows: (res as any).rowCount || 0 };
  }

  async getInspectorData(
    inspectionID: number
  ): Promise<InspectorRow | undefined> {
    const sql = `SELECT * FROM Inspector WHERE InspectionID = $1`;
    const rows = await query<InspectorRow>(sql, [inspectionID]);
    return rows[0];
  }
}