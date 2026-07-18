import { RowDataPacket } from "mysql2";

export interface PenaltyPaymentRow extends RowDataPacket {
    penaltypaymentid: number;
    penaltyid: number;
    paymentcode: string;
    paymentdate: Date;
    amount: number;
}

export interface PenaltyPaymentPayload {
    penaltyid: number;
    paymentcode: string;
    paymentdate: Date;
    amount: number;
}