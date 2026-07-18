import { RowDataPacket } from "mysql2";

export interface ContactPayload {
    phoneno: string;
    emailaddress: string;
    instagram: string;
    facebook: string;
    pobox: string;
}

export interface ContactRow extends RowDataPacket {
    contactid: number;
    phoneno: string;
    emailaddress: string;
    instagram: string;
    facebook: string;
    pobox: string;
}