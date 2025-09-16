import db from "../utils/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ServicesRow, ServicesPayload } from "../interfaces/services";

export default class ServiceManager {
    constructor() {}

    async fetchPending(): Promise<ServicesRow[]> {
        try {
            const query = `
                SELECT * FROM Services
                WHERE PaymentStatus = 'Paid' AND ServiceStatus = 'Pending'
            `;
            const [rows] = await db.execute<ServicesRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching pending services:", error);
            throw error;
        }
    }

    async approvePending(serviceID: number): Promise<boolean> {
        try {
            const query = `
                UPDATE Services
                SET ServiceStatus = 'Approved'
                WHERE ServiceID = ? AND ServiceStatus = 'Pending'
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [serviceID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error approving service:", error);
            throw error;
        }
    }
}
