import db from '../utils/db';
import { ResultSetHeader} from 'mysql2';
import { RegistrationPayload, RegistrationRow } from '../interfaces/registration';

export default class Users{
    constructor(){}

    async createUser(data:RegistrationPayload):Promise<{ message: string; id: number }>{
        const sql = `INSERT INTO Registration () VALUES ()`;
        const [result] = await db.execute<ResultSetHeader>(sql, [
            data.Name,
            data.PhoneNo,
            data.Email,
            data.Password,
            data.Gender,
            data.RegType,
            data.dLocation,
            data.Photo,
            data.accStatus
        ]);
        return {message:'User created successfully', id:result.insertId};
    }

    async readUsers():Promise<RegistrationRow[]>{
        const sql = `SELECT * FROM Registration`;
        const [rows] = await db.execute<RegistrationRow[]>(sql);
        return rows;
    }

    async updateUser(RegID:number, data:RegistrationPayload):Promise<{ message: string; affectedRows: number }>{
        const sql = ``;
        const [result] = await db.execute<ResultSetHeader>(sql, [
            data.Name,
            data.PhoneNo,
            data.Email,
            data.Password,
            data.Gender,
            data.RegType,
            data.dLocation,
            data.Photo,
            data.accStatus
        ]);
        return { message: 'User updated', affectedRows: result.affectedRows }
    }

    async deleteUser(RegID:number):Promise<{ message: string; affectedRows: number }>{
        const sql =  ``;
        const [result] = await db.execute<ResultSetHeader>(sql, [RegID]);
        return { message: 'User deleted', affectedRows: result.affectedRows }
    }
}
