// services.ts
import { RowDataPacket } from "mysql2";

/**
 * Mirrors the Services table exactly
 */
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

/**
 * Mirrors the Lending table exactly
 */
export interface LendingRow extends RowDataPacket {
  LendID: number;
  EquipmentID: number;
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus: "Done" | "Yet";
}

/**
 * Data required for creating/updating a Lending row
 */
export interface LendingPayload {
  EquipmentID: number;
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus?: "Done" | "Yet";
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
