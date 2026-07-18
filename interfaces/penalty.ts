import { RowDataPacket } from "mysql2";

export interface PenaltyRow extends RowDataPacket {
  penaltyid: number;
  equipmentid: number;
  customerid: number;
  description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  dcondition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  penalty: number;
  penaltystatus: 'Processing' | 'Paid' | 'Not Paid';
}

export interface PenaltyPayload {
  equipmentid: number;
  customerid: number;
  description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  dcondition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  penalty: number;
  penaltystatus: 'Processing' | 'Paid' | 'Not Paid';
}
