// interfaces/payment.ts
import { RowDataPacket } from "mysql2";

export interface PaymentRow extends RowDataPacket {
  memberid: number;
  name: string;
  phoneno: string;
  processid: number;
  amount: number;
  date: Date;
}

export interface PaymentPayload {
  memberid: number;
  name: string;
  phoneno: string;
  amount: number;
  date: Date;
}
