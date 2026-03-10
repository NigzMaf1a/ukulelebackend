import { RowDataPacket } from "mysql2";

export default interface LendingRow extends RowDataPacket{
    LendID: number;
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    LendingDate: Date;
    Cost: number;
    Hours: number;
    ServiceID: number;
    LendingStatus : 'Done' | 'Yet';
    Performed: 'Yes' | 'No';
}

export interface LendingPayload{
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    LendingDate: Date;
    Cost: number;
    Hours: number;
    ServiceID: number;
    LendingStatus : 'Done' | 'Yet';
    Performed: 'Yes' | 'No';
}