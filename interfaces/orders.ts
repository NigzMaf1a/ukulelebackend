import { RowDataPacket } from "mysql2";

export default interface OrderRow extends RowDataPacket{
    OrderID: number;
    SupplyID:number;
    OrderDate:Date;
    OrderAmount:number;
    OrderStatus: 'Processing' | 'Hauled' | 'Delivered' | 'Cancelled';
}

export interface OrderPayload{
    SupplyID:number;
    OrderDate:Date;
    OrderAmount:number;
    OrderStatus: 'Processing' | 'Hauled' | 'Delivered' | 'Cancelled';
}