import { RowDataPacket } from "mysql2";

export interface SupplyRow extends RowDataPacket {
  supplyid: number;
  price: number;
  suppliername: string;
  supplydate: Date;
  phoneno: string;
  supplytype: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
  available: 'Yes' | 'No';
  availableunits: number;
  supplystatus: "Delivered" | "Undelivered";
}

export interface SupplyPayload {
  price: number;
  suppliername: string;
  supplydate: Date;
  phoneno: string;
  supplytype: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
  available: 'Yes' | 'No';
  availableunits: number;
  supplystatus: "Delivered" | "Undelivered";
}
