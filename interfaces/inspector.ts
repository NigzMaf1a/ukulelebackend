import { RowDataPacket } from "mysql2";

export interface InspectorRow extends RowDataPacket {
  equipmentid: number;
  inspectionid: number;
  serviceid: number;
  inspectiondate: Date;
  inspectorname: string;
  dcondition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
}

export interface InspectorPayload {
  equipmentid: number;
  serviceid: number;
  inspectiondate: Date;
  inspectorname: string;
  dcondition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
}
