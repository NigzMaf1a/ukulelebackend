// interfaces/finance.ts
import { RowDataPacket } from "mysql2";

export interface FinanceRow extends RowDataPacket {
  CustomerID: number;
  Name: string;
  PhoneNo: string;
  TransactionID: number;
  TransactionName: string; 
  TransactionDate: Date;
  Amount: number;
  TransactType: "Deposit" | "Payment";
  ServiceID: number;
}

export interface FinancePayload {
  CustomerID: number;
  Name: string;
  PhoneNo: string;
  TransactionName: string; 
  TransactionDate: Date;
  Amount: number;
  TransactType: "Deposit" | "Payment";
  ServiceID: number;
}
