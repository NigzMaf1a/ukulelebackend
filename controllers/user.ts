import { Request, Response, RequestHandler } from 'express';
import Users from '../models/user';
import { RegistrationPayload } from '../interfaces/registration';

const user = new Users();

export const createUser:RequestHandler = async (req:Request, res:Response) => {
    const regData:RegistrationPayload = req.body;

    try{
        const result = await user.createUser(regData);
        res.status(201).json(result);
    } catch(err){
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to create user', details: message });
    }
};

export const readUsers:RequestHandler = async (req:Request, res:Response) => {
    try{
        const [rows] = await user.readUsers();
        console.log('Rows:', rows)
        res.status(200).json(rows);
    } catch(err){
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to fetch users', details: message });
    }
};