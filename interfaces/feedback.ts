import { RowDataPacket } from "mysql2";

export interface FeedbackRow extends RowDataPacket {
  feedbackid: number;
  customerid: number;
  name: string;
  comments: string | null;
  response: string | null;
  rating: number; // 1 → 5 only
}

export interface FeedbackPayload {
  customerid: number;
  name: string;
  comments?: string | null;
  response?: string | null;
  rating: number;
}
