import { RowDataPacket } from "mysql2";

export interface BookingRow extends RowDataPacket {
    bookingid: number;
    genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    bookingdate: string; // or Date
    cost: number;
    hours: number;
    serviceid: number;
    bookstatus: 'Tick' | 'Untick';
}

export interface BookingPayload {
    genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    bookingdate: string;
    cost: number;
    hours: number;
    serviceid: number;
    bookstatus: 'Tick' | 'Untick';
}
