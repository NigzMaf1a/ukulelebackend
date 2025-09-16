import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { LendingPayload, LendingRow } from "../interfaces/soundsystem";

export default class SoundSystem {
    constructor() {}

    // Get all lending entries where Performed = 'No'
    async getNonPerformed(): Promise<LendingRow[]> {
        const sql = `SELECT * FROM Lending WHERE Performed = 'No'`;
        const [rows] = await db.execute<LendingRow[]>(sql);
        return rows;
    }

    // Update a lending entry to mark Performed = 'Yes' by LendingID
    async updateNonPerformed(lendID: number): Promise<boolean> {
        const sql = `UPDATE Lending SET Performed = 'Yes' WHERE LendID = ?`;
        const [result] = await db.execute<ResultSetHeader>(sql, [lendID]);
        return result.affectedRows > 0; // returns true if updated
    }
}
