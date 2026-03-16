import { query } from '../utils/db';
import { ContactRow, ContactPayload } from '../interfaces/contact';

export default class Contacts {
  constructor() {}

  async createContact(data: ContactPayload): Promise<{ message: string; affectedRows: number }> {
    const existing = await query<ContactRow>(`SELECT * FROM Contact`);
    if (existing.length > 0) {
      const sql = `
        UPDATE Contact
        SET PhoneNo = $1, Instagram = $2, Facebook = $3, EmailAddress = $4, POBox = $5
      `;
      const res = await query(sql, [
        data.PhoneNo,
        data.Instagram,
        data.Facebook,
        data.EmailAddress,
        data.PoBox
      ]);
      return { message: 'Contact updated successfully', affectedRows: (res as any).rowCount || 0 };
    } else {
      const sql = `
        INSERT INTO Contact
          (PhoneNo, Instagram, Facebook, EmailAddress, POBox)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const res = await query(sql, [
        data.PhoneNo,
        data.Instagram,
        data.Facebook,
        data.EmailAddress,
        data.PoBox
      ]);
      return { message: 'Contact created successfully', affectedRows: (res as any).rowCount || 0 };
    }
  }

  async readContact(): Promise<ContactRow | undefined> {
    const sql = `SELECT * FROM Contact LIMIT 1`;
    const rows = await query<ContactRow>(sql);
    return rows[0];
  }

  async deleteContact(): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Contact`;
    const res = await query(sql);
    return { message: 'Contact deleted', affectedRows: (res as any).rowCount || 0 };
  }
}