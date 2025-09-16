// interfaces/about.ts

import { RowDataPacket } from "mysql2";

/**
 * Row returned from the DB (single column)
 */
export interface AboutRow extends RowDataPacket {
  Detail: string;
}

/**
 * Payload used when updating the About info
 */
export interface AboutPayload {
  Detail: string;
}
