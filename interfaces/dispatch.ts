// interfaces/dispatch.ts

import { RowDataPacket } from "mysql2";

/**
 * Row returned from DB (all fields including PK)
 */
export interface DispatchRow extends RowDataPacket {
  DispatchID: number;
  CustomerID: number;
  Name: string;
  dLocation: string;
  ServiceID: number;
  PhoneNo: string;
  Dispatched: "Yes" | "No";
  DispatchDate: Date;
}

/**
 * Data used to create a new Dispatch row (no PK)
 */
export interface DispatchPayload {
  CustomerID: number;
  Name: string;
  dLocation: string;
  ServiceID: number;
  PhoneNo: string;
  Dispatched?: "Yes" | "No"; // optional → defaults to "No"
  DispatchDate?: Date;
}
