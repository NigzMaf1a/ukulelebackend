import { RowDataPacket } from "mysql2";

export interface AboutRow extends RowDataPacket {
  detail: string;
}

export interface AboutPayload {
  detail: string;
}
