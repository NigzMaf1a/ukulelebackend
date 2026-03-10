import { RowDataPacket } from "mysql2";

export default interface OrderPaymentRow extends RowDataPacket{
    OrderPayID: number;
    OrderID:number;
    PaymentCode:string;
    PaymentDate:Date;
    Amount:number;
}

export interface OrderPaymentPayload{
    OrderID:number;
    PaymentCode:string;
    PaymentDate:Date;
    Amount:number;
}