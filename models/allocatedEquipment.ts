import { query } from "../utils/db";
import {
  AllocatedEquipmentRow,
  AllocatedEquipmentPayload,
} from "../interfaces/allocatedEquipment";

export default class AllocatedEquipmentModel {
  constructor() {}

  async createAllocatedEquipment(
    data: AllocatedEquipmentPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      INSERT INTO AllocatedEquipment
        (EquipmentID, LendID, RegID, EquipStatus)
      VALUES ($1, $2, $3, $4)
    `;
    const res = await query(sql, [
      data.EquipmentID,
      data.LendID,
      data.RegID,
      data.EquipStatus,
    ]);
    return { message: "Allocated equipment created", affectedRows: (res as any).rowCount || 0 };
  }

  async readAllocatedEquipment(): Promise<AllocatedEquipmentRow[]> {
    const sql = `SELECT * FROM AllocatedEquipment`;
    return await query<AllocatedEquipmentRow>(sql);
  }

  async getAllocatedEquipmentData(
    allocatedEquipmentID: number
  ): Promise<AllocatedEquipmentRow | undefined> {
    const sql = `
      SELECT * FROM AllocatedEquipment
      WHERE AllocatedEquipmentID = $1
    `;
    const rows = await query<AllocatedEquipmentRow>(sql, [allocatedEquipmentID]);
    return rows[0];
  }

  async updateAllocatedEquipment(
    allocatedEquipmentID: number,
    data: AllocatedEquipmentPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE AllocatedEquipment
      SET EquipmentID = $1, LendID = $2, RegID = $3, EquipStatus = $4
      WHERE AllocatedEquipmentID = $5
    `;
    const res = await query(sql, [
      data.EquipmentID,
      data.LendID,
      data.RegID,
      data.EquipStatus,
      allocatedEquipmentID,
    ]);
    return { message: `Allocated equipment ${allocatedEquipmentID} updated`, affectedRows: (res as any).rowCount || 0 };
  }

  async deleteAllocatedEquipment(
    allocatedEquipmentID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      DELETE FROM AllocatedEquipment
      WHERE AllocatedEquipmentID = $1
    `;
    const res = await query(sql, [allocatedEquipmentID]);
    return { message: `Allocated equipment ${allocatedEquipmentID} deleted`, affectedRows: (res as any).rowCount || 0 };
  }
}