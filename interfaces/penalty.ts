import { RowDataPacket } from "mysql2";

export interface PenaltyRow  extends RowDataPacket {
  PenaltyID: number;
  EquipmentID: number;
  Description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  Penalty: number;
}

export interface PenaltyPayload {
  EquipmentID: number;
  Description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  Penalty: number;
}
