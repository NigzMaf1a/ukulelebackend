// interfaces/payment.ts
import { RowDataPacket } from "mysql2";

export interface PaymentRow extends RowDataPacket {
  MemberID: number;
  Name: string;
  PhoneNo: string;
  ProcessID: number;
  Amount: number;
  Date: Date;
}

export interface PaymentPayload {
  MemberID: number;
  Name: string;
  PhoneNo: string;
  Amount: number;
  Date: Date;
}
