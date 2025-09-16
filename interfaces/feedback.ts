import { RowDataPacket } from "mysql2";

export interface FeedbackRow extends RowDataPacket{
  FeedbackID: number;
  CustomerID: number;
  Name: string;
  Comments: string | null;
  Response: string | null;
  Rating: number; // 1 → 5 only
}

export interface FeedbackPayload {
  CustomerID: number;
  Name: string;
  Comments?: string | null;
  Response?: string | null;
  Rating: number;
}
