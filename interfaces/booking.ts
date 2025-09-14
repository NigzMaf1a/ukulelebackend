import { RowDataPacket } from "mysql2";

export interface BookingPayload{
    BookingID:number;
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    BookingDate: string;
    Cost:number;
    Hours:number;
    BookStatus:'Tick' | 'Untick';
}

export interface BookingRow extends RowDataPacket{
    BookingID:number;
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    BookingDate: string;
    Cost:number;
    Hours:number;
    BookStatus:'Tick' | 'Untick';
}