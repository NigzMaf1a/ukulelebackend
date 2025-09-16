import { Request, Response, RequestHandler } from 'express';
import Contacts from '../models/contacts';
import { ContactPayload } from '../interfaces/contact';

const contacts = new Contacts();

/**
 * Create or replace the contact record
 */
export const upsertContact: RequestHandler = async (req: Request, res: Response) => {
    const contact: ContactPayload = req.body;

    try {
        const result = await contacts.createContact(contact);
        res.status(201).json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to create/update contact', details: message });
    }
};

/**
 * Read the singleton contact record
 */
export const readContact: RequestHandler = async (req: Request, res: Response) => {
    try {
        const row = await contacts.readContact();
        if (!row) {
            res.status(404).json({ message: 'No contact record found' });
            return;
        }
        res.status(200).json(row);
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to fetch contact', details: message });
    }
};

/**
 * Delete the singleton contact record
 */
export const deleteContact: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await contacts.deleteContact();
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No contact record to delete' });
            return;
        }
        res.status(200).json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to delete contact', details: message });
    }
};
