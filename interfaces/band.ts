import { RowDataPacket } from "mysql2";

export interface BookingRow extends RowDataPacket{
    BookingID: number;
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    BookingDate: string; // or Date
    Cost: number;
    Hours: number;
    ServiceID: number;
    BookStatus: 'Tick' | 'Untick';
}

export interface BookingPayload {
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    BookingDate: string;
    Cost: number;
    Hours: number;
    ServiceID: number;
    BookStatus: 'Tick' | 'Untick';
}
