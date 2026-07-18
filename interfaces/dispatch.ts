import { RowDataPacket } from "mysql2";

export interface DispatchRow extends RowDataPacket {
  dispatchid: number;
  customerid: number;
  name: string;
  dlocation: string;
  serviceid: number;
  phoneno: string;
  dispatched: 'Pending' | 'Dispatched' | 'Packed' | 'Returned';
  dispatchdate: Date;
}

export interface DispatchPayload {
  customerid: number;
  name: string;
  dlocation: string;
  serviceid: number;
  phoneno: string;
  dispatched?: 'Pending' | 'Dispatched' | 'Packed' | 'Returned';
  dispatchdate?: Date;
}
