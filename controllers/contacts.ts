import { Request, Response, RequestHandler } from 'express';
import Contacts from '../models/contacts';
import { ContactPayload } from '../interfaces/contact';

const contacts = new Contacts();

export const createContact:RequestHandler = async (req: Request, res: Response) => {
    const contact:ContactPayload = req.body;

    try{
        const result = await contacts.createContact(contact);
        res.status(201).json(result);
    } catch(err){
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to create contact', details: message });
    }
};

export const readContacts:RequestHandler = async (req: Request, res: Response) => {
    try{
        const [rows] = await contacts.readContact();
        console.log('Rows:', rows)
        res.status(200).json(rows);
    } catch(err){
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to fetch accountants', details: message });
    }
};
export const updateContact:RequestHandler<{ContactID:number}> = async (req, res) =>{
    const id = Number(req.params.ContactID);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid accountant ID' });
        return;
    }

    const contact:ContactPayload = req.body;

    try{
        const result = await contacts.updateContact(id, contact);
        if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Contact not found' });
        return;
        }
        res.status(200).json(result);
    } catch(err){
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to update contact', details: message });
    }
};

export const deleteContact:RequestHandler<{ContactID:number}> = async (req, res) =>{
    const id = Number(req.params.ContactID);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid contact ID' });
        return;
    }

    try{
        const result = await contacts.deleteContact(id);
        if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Accountant not found' });
        return;
        }
        res.status(200).json(result);
    } catch(err){
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to delete contact', details: message });
    }
};