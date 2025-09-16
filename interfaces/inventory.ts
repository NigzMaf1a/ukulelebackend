// interfaces/inventory.ts
import { RowDataPacket } from "mysql2";

/**
 * Represents a full row from the Inventory table
 */
export interface InventoryRow extends RowDataPacket {
  EquipmentID: number;
  Price: number;
  Description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  PurchaseDate: Date;
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  Availability: "Available" | "Unavailable";
}

/**
 * Payload for creating/updating an Inventory record
 */
export interface InventoryPayload {
  Price: number;
  Description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  PurchaseDate: Date;
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  Availability: "Available" | "Unavailable";
}
