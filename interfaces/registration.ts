import { RowDataPacket } from "mysql2";
import { QueryResultRow } from "pg";

export interface RegistrationRow extends RowDataPacket {
  regid: number;
  name: string;
  phoneno: string;
  email: string;
  password: string;
  gender: "Male" | "Female";
  regtype:
  | "Customer"
  | "DJ"
  | "Mcee"
  | "Storeman"
  | "Accountant"
  | "Dispatchman"
  | "Inspector"
  | "Band"
  | "Admin"
  | "Service Manager"
  | "Supplier";
  dlocation:
  | "Nairobi CBD"
  | "Westlands"
  | "Karen"
  | "Langata"
  | "Kilimani"
  | "Eastleigh"
  | "Umoja"
  | "Parklands"
  | "Ruiru"
  | "Ruai"
  | "Gikambura"
  | "Kitengela"
  | "Nairobi West"
  | "Nairobi East";
  photo: Buffer | null;
  accstatus: "Pending" | "Approved" | "Inactive";
  lastaccessed: Date;
}

export interface RegistrationPayload {
  name: string;
  phoneno: string;
  email: string;
  password: string;
  gender: "Male" | "Female";
  regtype:
  | "Customer"
  | "DJ"
  | "Mcee"
  | "Storeman"
  | "Accountant"
  | "Dispatchman"
  | "Inspector"
  | "Band"
  | "Admin"
  | "Supplier";
  dlocation:
  | "Nairobi CBD"
  | "Westlands"
  | "Karen"
  | "Langata"
  | "Kilimani"
  | "Eastleigh"
  | "Umoja"
  | "Parklands"
  | "Ruiru"
  | "Ruai"
  | "Gikambura"
  | "Kitengela"
  | "Nairobi West"
  | "Nairobi East";
  photo: Buffer | null;
  accstatus: "Pending" | "Approved" | "Inactive";
  lastaccessed: Date;
}