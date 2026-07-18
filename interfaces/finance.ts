// interfaces/finance.ts
import { RowDataPacket } from "mysql2";

export interface FinanceRow extends RowDataPacket {
  customerid: number;
  name: string;
  phoneno: string;
  transactionid: number;
  transactionname: string;
  transactiondate: Date;
  amount: number;
  transactionstatus: 'Pending' | 'Approved' | 'Rejected';
  transacttype: "Deposit" | "Payment";
  serviceid: number;
}

export interface FinancePayload {
  customerid: number;
  name: string;
  phoneno: string;
  transactionname: string;
  transactiondate: Date;
  amount: number;
  transactionstatus: 'Pending' | 'Approved' | 'Rejected';
  transacttype: "Deposit" | "Payment";
  serviceid: number;
}
