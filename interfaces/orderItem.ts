import { RowDataPacket } from "mysql2";

export default interface OrderItem extends RowDataPacket {
    orderitemid: number;
    orderid: number;
    supplytype: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    quantity: number;
}

export interface OrderItemPayload {
    orderid: number;
    supplytype: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    quantity: number;
}