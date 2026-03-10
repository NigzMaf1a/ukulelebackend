import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import {
  AllocatedEquipmentRow,
  AllocatedEquipmentPayload,
} from "../interfaces/allocatedEquipment";

export default class AllocatedEquipment {
  constructor() {}

  // CREATE
  async createAllocatedEquipment(
    data: AllocatedEquipmentPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO AllocatedEquipment
        (EquipmentID, LendID, RegID, EquipStatus)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.LendID,
      data.RegID,
      data.EquipStatus,
    ]);

    return {
      message: "Allocated equipment created",
      id: result.insertId,
    };
  }

  // READ ALL
  async readAllocatedEquipment(): Promise<AllocatedEquipmentRow[]> {
    const sql = `SELECT * FROM AllocatedEquipment`;

    const [rows] = await db.execute<AllocatedEquipmentRow[]>(sql);

    return rows;
  }

  // UPDATE
  async updateAllocatedEquipment(
    allocatedEquipmentID: number,
    data: AllocatedEquipmentPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE AllocatedEquipment
      SET EquipmentID = ?, LendID = ?, RegID = ?, EquipStatus = ?
      WHERE AllocatedEquipmentID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.EquipmentID,
      data.LendID,
      data.RegID,
      data.EquipStatus,
      allocatedEquipmentID,
    ]);

    return {
      message: "Allocated equipment updated",
      affectedRows: result.affectedRows,
    };
  }

  // DELETE
  async deleteAllocatedEquipment(
    allocatedEquipmentID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      DELETE FROM AllocatedEquipment
      WHERE AllocatedEquipmentID = ?
    `;

    const [result] = await db.execute<ResultSetHeader>(sql, [
      allocatedEquipmentID,
    ]);

    return {
      message: "Allocated equipment deleted",
      affectedRows: result.affectedRows,
    };
  }

  // READ SINGLE RECORD
  async getAllocatedEquipmentData(
    allocatedEquipmentID: number
  ): Promise<AllocatedEquipmentRow | undefined> {
    const sql = `
      SELECT * FROM AllocatedEquipment
      WHERE AllocatedEquipmentID = ?
    `;

    const [rows] = await db.execute<AllocatedEquipmentRow[]>(sql, [
      allocatedEquipmentID,
    ]);

    return rows[0];
  }
}