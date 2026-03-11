import { RowDataPacket } from "mysql2";

/**
 * Services table row
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
 * Payload for creating/updating a Services row
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
 * Lending table row
 */
export default interface LendingRow extends RowDataPacket {
  LendID: number;
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus: "Done" | "Yet";
  Performed: "Yes" | "No";
}

/**
 * Payload for creating/updating a Lending row
 */
export interface LendingPayload {
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  LendingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  LendingStatus?: "Done" | "Yet";
  Performed: "Yes" | "No";
}

/**
 * Booking table row
 */
export default interface BookingRow extends RowDataPacket {
  BookingID: number;
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  BookingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  BookStatus: "Tick" | "Untick";
}

/**
 * Payload for creating/updating a Booking row
 */
export interface BookingPayload {
  Genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  BookingDate: Date;
  Cost: number;
  Hours: number;
  ServiceID: number;
  BookStatus?: "Tick" | "Untick";
}