import { RowDataPacket } from "mysql2";

export interface DispatchRow extends RowDataPacket {
  DispatchID: number;
  CustomerID: number;
  Name: string;
  dLocation: string;
  ServiceID: number;
  PhoneNo: string;
  Dispatched: 'Pending' | 'Dispatched' | 'Packed' | 'Returned';
  DispatchDate: Date;
}

export interface DispatchPayload {
  CustomerID: number;
  Name: string;
  dLocation: string;
  ServiceID: number;
  PhoneNo: string;
  Dispatched?: 'Pending' | 'Dispatched' | 'Packed' | 'Returned';
  DispatchDate?: Date;
}
