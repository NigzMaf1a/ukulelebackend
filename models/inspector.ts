import { query } from "../utils/db";
import { InspectorRow, InspectorPayload } from "../interfaces/inspector";

export default class InspectorModel {
  constructor() { }

  async createInspector(
    data: InspectorPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Inspector
        (EquipmentID, ServiceID, InspectionDate, InspectorName, dCondition)
      VALUES ($1, $2, $3, $4)
      RETURNING InspectionID
    `;
    const rows = await query<{ InspectionID: number }>(sql, [
      data.equipmentid,
      data.serviceid,
      data.inspectiondate,
      data.inspectorname,
      data.dcondition,
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
      SET EquipmentID = $1, SET ServiceID = $2 InspectionDate = $3, InspectorName = $4, dCondition = $5
      WHERE InspectionID = $6
    `;
    const res = await query(sql, [
      data.equipmentid,
      data.serviceid,
      data.inspectiondate,
      data.inspectorname,
      data.dcondition,
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