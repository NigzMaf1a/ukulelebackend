// interfaces/inventory.ts
import { RowDataPacket } from "mysql2";

/**
 * Represents a full row from the Inventory table
 */
export interface InventoryRow extends RowDataPacket {
  equipmentid: number;
  price: number;
  description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  purchasedate: Date;
  dcondition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  availability: "Available" | "Unavailable";
}

/**
 * Payload for creating/updating an Inventory record
 */
export interface InventoryPayload {
  price: number;
  description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  purchasedate: Date;
  dcondition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  availability: "Available" | "Unavailable";
}
