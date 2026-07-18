import { RowDataPacket } from "mysql2";

/** Mirrors the Member table */
export interface MemberRow extends RowDataPacket {
  memberid: number;
  regid: number;
  type:
  | "Admin"
  | "DJ"
  | "Mcee"
  | "Band"
  | "Storeman"
  | "Accountant"
  | "Dispatchman"
  | "Inspector"
  | "Service Manager"
  | "Supplier";
  name: string;
  phoneno: string;
  paymentstatus: "Paid" | "Not Paid";
}

/** Data for creating/updating a Member row */
export interface MemberPayload {
  regid: number;
  type:
  | "Admin"
  | "DJ"
  | "Mcee"
  | "Band"
  | "Storeman"
  | "Accountant"
  | "Dispatchman"
  | "Inspector"
  | "Service Manager"
  | "Supplier";
  name: string;
  phoneno: string;
  paymentstatus: "Paid" | "Not Paid";
}
