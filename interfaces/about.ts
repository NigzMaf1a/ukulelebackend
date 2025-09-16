import { RowDataPacket } from "mysql2";

export interface AboutRow extends RowDataPacket {
  Detail: string;
}

export interface AboutPayload {
  Detail: string;
}
