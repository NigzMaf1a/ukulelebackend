import { RowDataPacket } from "mysql2";

/**
 * Mirrors the Customer table exactly
 */
export interface CustomerRow extends RowDataPacket {
  regid: number;
  customerid: number;
  name: string;
  email: string;
  phoneno: string;
}

/**
 * Data required for creating/updating a Customer row
 */
export interface CustomerPayload {
  regid: number;
  name: string;
  email: string;
  phoneno: string;
}
