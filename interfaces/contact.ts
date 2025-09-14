import { RowDataPacket } from "mysql2";

export interface ContactPayload{
    ContactID:number;
    PhoneNo:string;
    EmailAddress:string;
    Instagram:string;
    Facebook:string;
    PoBox:string;
}

export interface ContactRow extends RowDataPacket{
    ContactID:number;
    PhoneNo:string;
    EmailAddress:string;
    Instagram:string;
    Facebook:string;
    PoBox:string;
}