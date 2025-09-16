import { RowDataPacket } from "mysql2";

export interface RegistrationRow extends RowDataPacket {
  RegID: number;
  Name: string;
  PhoneNo: string;
  Email: string;
  Password: string;
  Gender: "Male" | "Female";
  RegType:
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
  dLocation:
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
  Photo: Buffer | null;
  accStatus: "Pending" | "Approved" | "Inactive";
  lastAccessed: Date;
}

export interface RegistrationPayload {
  Name: string;
  PhoneNo: string;
  Email: string;
  Password: string;
  Gender: "Male" | "Female";
  RegType:
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
  dLocation:
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
  Photo?: Buffer | null;
  accStatus?: "Pending" | "Approved" | "Inactive";
  lastAccessed?: Date;
}
