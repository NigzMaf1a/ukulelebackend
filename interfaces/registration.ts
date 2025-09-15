import { RowDataPacket } from "mysql2";

export interface RegistrationPayload{
    Name:string;
    PhoneNo:string;
    Email:string;
    Password:string;
    Gender:'Male' | 'Female';
    RegType:'Customer' | 'DJ' | 'Mcee' | 'Storeman' | 'Accountant' | 'Dispatchman' | 'Inspector' | 'Band' | 'Admin' | 'Supplier';
    dLocation:string;
    Photo:Blob;
    accStatus: 'Pending' | 'Approved' | 'Inactive';
    latitude:number;
    longitude:number;
}

export interface RegistrationRow extends RowDataPacket{
    RegID:number;
    Name:string;
    PhoneNo:string;
    Email:string;
    Password:string;
    Gender:'Male' | 'Female';
    RegType:'Customer' | 'DJ' | 'Mcee' | 'Storeman' | 'Accountant' | 'Dispatchman' | 'Inspector' | 'Band' | 'Admin' | 'Supplier';
    dLocation:string;
    Photo:Blob;
    accStatus: 'Pending' | 'Approved' | 'Inactive';
    lastAccessed:string;
    latitude:number;
    longitude:number;
}