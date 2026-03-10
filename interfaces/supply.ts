import { RowDataPacket } from "mysql2";

export interface SupplyRow extends RowDataPacket {
  SupplyID: number;
  Price: number;
  SupplierName: string;
  SupplyDate: Date;
  PhoneNo: string;
  SupplyType: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
  Available: 'Yes' | 'No';
  AvailableUnits: number;
  SupplyStatus: "Delivered" | "Undelivered";
}

export interface SupplyPayload {
  Price: number;
  SupplierName: string;
  SupplyDate: Date;
  PhoneNo: string;
  SupplyType: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
  Available: 'Yes' | 'No';
  AvailableUnits: number;
  SupplyStatus: "Delivered" | "Undelivered";
}
