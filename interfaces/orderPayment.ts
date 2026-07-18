import { RowDataPacket } from "mysql2";

export default interface OrderPaymentRow extends RowDataPacket {
    orderpayid: number;
    orderid: number;
    paymentcode: string;
    paymentdate: Date;
    amount: number;
}

export interface OrderPaymentPayload {
    orderid: number;
    paymentcode: string;
    paymentdate: Date;
    amount: number;
}