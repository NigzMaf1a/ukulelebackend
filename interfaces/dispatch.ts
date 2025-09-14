import { RowDataPacket } from "mysql2";

export interface DispatchPayload{
    DispatchID:number;
    CustomerID:number;
    Name:string;
    Location:string;
    ServiceID:number;
    PhoneNo:string;
    Dispatched: 'Yes' | 'No';
    DispatchDate:string;
}

export interface DispatchRow extends RowDataPacket{
    DispatchID:number;
    CustomerID:number;
    Name:string;
    Location:string;
    ServiceID:number;
    PhoneNo:string;
    Dispatched: 'Yes' | 'No';
    DispatchDate:string;
}