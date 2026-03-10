import { RowDataPacket } from "mysql2";

export interface PenaltyPaymentRow extends RowDataPacket{
    PenaltyPaymentID: number;
    PenaltyID:number;
    PaymentCode:string;
    PaymentDate:Date;
    Amount:number;
}

export interface PenaltyPaymentPayload{
    PenaltyID:number;
    PaymentCode:string;
    PaymentDate:Date;
    Amount: number;
}