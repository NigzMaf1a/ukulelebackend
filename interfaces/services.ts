import { RowDataPacket } from "mysql2";

/**
 * Services table row
 */
export interface ServicesRow extends RowDataPacket {
  serviceid: number;
  customerid: number;
  genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  cost: number;
  hours: number;
  servicetype: "Lending" | "Booking";
  servicestatus: "Approved" | "Pending";
  paymentstatus: "Paid" | "Not Paid";
}

/**
 * Payload for creating/updating a Services row
 */
export interface ServicesPayload {
  customerid: number;
  genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  cost: number;
  hours: number;
  servicetype: "Lending" | "Booking";
  servicestatus?: "Approved" | "Pending";
  paymentstatus?: "Paid" | "Not Paid";
}

/**
 * Lending table row
 */
export interface LendingRow extends RowDataPacket {
  lendid: number;
  genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  lendingdate: Date;
  cost: number;
  hours: number;
  serviceid: number;
  lendingstatus: "Done" | "Yet";
  performed: "Yes" | "No";
}

/**
 * Payload for creating/updating a Lending row
 */
export interface LendingPayload {
  genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  lendingdate: Date;
  cost: number;
  hours: number;
  serviceid: number;
  lendingstatus?: "Done" | "Yet";
  performed: "Yes" | "No";
}

/**
 * Booking table row
 */
export interface BookingRow extends RowDataPacket {
  bookingid: number;
  genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  bookingdate: Date;
  cost: number;
  hours: number;
  serviceid: number;
  bookstatus: "Tick" | "Untick";
  performed: "Yes" | "No";
}

/**
 * Payload for creating/updating a Booking row
 */
export interface BookingPayload {
  genre: "Reggae" | "Rhumba" | "Zilizopendwa" | "Benga" | "Soul" | "RnB";
  bookingdate: Date;
  cost: number;
  hours: number;
  serviceid: number;
  bookstatus?: "Tick" | "Untick";
  performed: "Yes" | "No";
}