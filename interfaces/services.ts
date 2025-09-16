import { RowDataPacket } from "mysql2";

export interface ServicesRow extends RowDataPacket {
  ServiceID: number;
  CustomerID: number;
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  Cost: number;
  Hours: number;
  ServiceType: "Lending" | "Booking";
  ServiceStatus: "Approved" | "Pending";
  PaymentStatus: "Paid" | "Not Paid";
}

/**
 * Data required for creating/updating a Services row
 */
export interface ServicesPayload {
  CustomerID: number;
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  Cost: number;
  Hours: number;
  ServiceType: "Lending" | "Booking";
  ServiceStatus?: "Approved" | "Pending";
  PaymentStatus?: "Paid" | "Not Paid";
}

export interface LendingRow extends RowDataPacket {
  LendID: number;
  EquipmentID: number;
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus: "Done" | "Yet";
  Performed:"Yes" | "No";
}
export interface LendingPayload {
  EquipmentID: number;
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus?: "Done" | "Yet";
  Performed:"Yes" | "No";
}

/**
 * Mirrors the Booking table exactly
 */
export interface BookingRow extends RowDataPacket {
  BookingID: number;
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  BookingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  BookStatus: "Tick" | "Untick";
}

/**
 * Data required for creating/updating a Booking row
 */
export interface BookingPayload {
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  BookingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  BookStatus?: "Tick" | "Untick";
}
