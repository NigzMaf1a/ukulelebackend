// models/dispatchManager.ts
import db from "../utils/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DispatchPayload, DispatchRow } from "../interfaces/dispatch";

export default class DispatchManager {
    constructor() {}

    async fetchUndispatched(): Promise<DispatchRow[]> {
        try {
            const query = `
                SELECT * FROM Dispatch
                WHERE Dispatched = 'No'
            `;
            const [rows] = await db.execute<DispatchRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching undispatched records:", error);
            throw error;
        }
    }

    async updateDispatch(dispatchID: number): Promise<boolean> {
        try {
            const query = `
                UPDATE Dispatch
                SET Dispatched = 'Yes'
                WHERE DispatchID = ? AND Dispatched = 'No'
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [dispatchID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating dispatch record:", error);
            throw error;
        }
    }
}
