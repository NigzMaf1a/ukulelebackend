import db from '../utils/db';
import { ResultSetHeader} from 'mysql2';
import {ContactRow, ContactPayload} from '../interfaces/contact';

export default class Contacts{
    constructor(){}

    async createContact(data:ContactPayload):Promise<{ message: string; id: number }>{
        const sql = `INSERT INTO Contact () VALUES ()`;
        const [result] = await db.execute<ResultSetHeader>(sql, [
            data.PhoneNo,
            data.Instagram,
            data.Facebook,
            data.EmailAddress,
            data.PoBox
        ]);
        return {message:'Contact created successfully', id:result.insertId};
    }

    async readContact():Promise<ContactRow[]>{
        const sql = `SELECT * FROM Contact`;
        const [rows] = await db.execute<ContactRow[]>(sql);
        return rows;
    }

    async updateContact(ContactID:number, data:ContactPayload):Promise<{ message: string; affectedRows: number }>{
        const sql = ``;
        const [result] = await db.execute<ResultSetHeader>(sql, [
            data.PhoneNo,
            data.Instagram,
            data.Facebook,
            data.EmailAddress,
            data.PoBox,
            ContactID
        ]);
        return { message: 'Contact updated', affectedRows: result.affectedRows }
    }

    async deleteContact(ContactID:number):Promise<{ message: string; affectedRows: number }>{
        const sql =  ``;
        const [result] = await db.execute<ResultSetHeader>(sql, [ContactID]);
        return { message: 'Contact deleted', affectedRows: result.affectedRows }
    }
}