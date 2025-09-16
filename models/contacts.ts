import db from '../utils/db';
import { ResultSetHeader } from 'mysql2';
import { ContactRow, ContactPayload } from '../interfaces/contact';

export default class Contacts {
    constructor() {}

    /**
     * Create or replace the contact record
     * (singleton table — only one row exists)
     */
    async createContact(data: ContactPayload): Promise<{ message: string }> {
        // First check if a record exists
        const [rows] = await db.execute<ContactRow[]>(`SELECT * FROM Contact`);
        if (rows.length > 0) {
            // Replace existing row
            const sql = `
                UPDATE Contact
                SET PhoneNo = ?, Instagram = ?, Facebook = ?, EmailAddress = ?, POBox = ?
            `;
            await db.execute<ResultSetHeader>(sql, [
                data.PhoneNo,
                data.Instagram,
                data.Facebook,
                data.EmailAddress,
                data.PoBox
            ]);
            return { message: 'Contact updated successfully' };
        } else {
            // Insert new row
            const sql = `
                INSERT INTO Contact
                    (PhoneNo, Instagram, Facebook, EmailAddress, POBox)
                VALUES (?, ?, ?, ?, ?)
            `;
            await db.execute<ResultSetHeader>(sql, [
                data.PhoneNo,
                data.Instagram,
                data.Facebook,
                data.EmailAddress,
                data.PoBox
            ]);
            return { message: 'Contact created successfully' };
        }
    }

    /**
     * Read the contact record (singleton)
     */
    async readContact(): Promise<ContactRow | undefined> {
        const sql = `SELECT * FROM Contact LIMIT 1`;
        const [rows] = await db.execute<ContactRow[]>(sql);
        return rows[0];
    }

    /**
     * Delete the contact record
     */
    async deleteContact(): Promise<{ message: string; affectedRows: number }> {
        const sql = `DELETE FROM Contact`;
        const [result] = await db.execute<ResultSetHeader>(sql);
        return { message: 'Contact deleted', affectedRows: result.affectedRows };
    }
}
