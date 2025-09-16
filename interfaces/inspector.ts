import { RowDataPacket } from "mysql2";

export interface InspectorRow extends RowDataPacket {
  EquipmentID: number;
  InspectionID: number;
  InspectionDate: Date;
  InspectorName: string;
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
}

export interface InspectorPayload {
  EquipmentID: number;
  InspectionDate: Date;
  InspectorName: string;
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
}
