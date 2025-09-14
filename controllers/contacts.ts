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
        res.status(500).json({ error: 'Failed to create user', details: message });
    }
};

export const readContacts:RequestHandler = async (req: Request, res: Response) => {};
export const updateContact:RequestHandler<{ContactID:number}> = async (req, res) =>{};
export const deleteContact:RequestHandler<{ContactID:number}> = async (req, res) =>{};