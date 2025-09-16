import { RowDataPacket } from "mysql2";

/**
 * Mirrors the Customer table exactly
 */
export interface CustomerRow extends RowDataPacket {
  RegID: number;
  CustomerID: number;
  Name: string;
  Email: string;
  PhoneNo: string;
}

/**
 * Data required for creating/updating a Customer row
 */
export interface CustomerPayload {
  RegID: number;
  Name: string;
  Email: string;
  PhoneNo: string;
}
