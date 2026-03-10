import { RowDataPacket } from "mysql2";

export default interface OrderItem extends RowDataPacket{
    OrderItemID: number;
    OrderID: number;
    SupplyType: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    Quantity:number;
}

export interface OrderItemPayload{
    OrderID: number;
    SupplyType: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    Quantity:number;
}