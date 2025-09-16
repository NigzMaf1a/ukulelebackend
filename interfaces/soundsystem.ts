import { RowDataPacket } from "mysql2";

export interface LendingRow extends RowDataPacket {
  LendID: number;
  EquipmentID: number;
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus: "Done" | "Yet";
  Performed: "Yes" | "No";
}

/**
 * Data required for creating/updating a Lending row
 */
export interface LendingPayload {
  EquipmentID: number;
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus?: "Done" | "Yet";
  Performed: "Yes" | "No";
}