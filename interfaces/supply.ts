// interfaces/supply.ts
import { RowDataPacket } from "mysql2";

export interface SupplyRow extends RowDataPacket {
  SupplyID: number;
  Price: number;
  SupplierName: string;
  SupplyDate: Date;
  PhoneNo: string;
  SupplyStatus: "Delivered" | "Undelivered";
}

export interface SupplyPayload {
  Price: number;
  SupplierName: string;
  SupplyDate: Date;
  PhoneNo: string;
  SupplyStatus: "Delivered" | "Undelivered";
}
