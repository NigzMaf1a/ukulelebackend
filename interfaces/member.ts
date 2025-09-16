import { RowDataPacket } from "mysql2";

/** Mirrors the Member table */
export interface MemberRow extends RowDataPacket {
  MemberID: number;
  RegID: number;
  Type:
    | "Admin"
    | "DJ"
    | "Mcee"
    | "Band"
    | "Storeman"
    | "Accountant"
    | "Dispatchman"
    | "Inspector"
    | "Supplier";
  Name: string;
  PhoneNo: string;
  PaymentStatus: "Paid" | "Not Paid";
}

/** Data for creating/updating a Member row */
export interface MemberPayload {
  RegID: number;
  Type:
    | "Admin"
    | "DJ"
    | "Mcee"
    | "Band"
    | "Storeman"
    | "Accountant"
    | "Dispatchman"
    | "Inspector"
    | "Supplier";
  Name: string;
  PhoneNo: string;
  PaymentStatus: "Paid" | "Not Paid";
}
