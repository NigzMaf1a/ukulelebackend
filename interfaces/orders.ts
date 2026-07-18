import { RowDataPacket } from "mysql2";

export default interface OrderRow extends RowDataPacket {
    orderid: number;
    supplyid: number;
    orderdate: Date;
    orderamount: number;
    orderstatus: 'Processing' | 'Hauled' | 'Delivered' | 'Paid' | 'Cancelled';
}

export interface OrderPayload {
    supplyid: number;
    orderdate: Date;
    orderamount: number;
    orderstatus: 'Processing' | 'Hauled' | 'Delivered' | 'Paid' | 'Cancelled';
}