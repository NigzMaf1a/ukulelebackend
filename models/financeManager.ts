import db from "../utils/db";
import { ResultSetHeader } from "mysql2";
import { ServicesRow } from "../interfaces/services";
import { FinanceRow } from "../interfaces/finance";

export default class FinanceManager {
    constructor() {}

    // Fetch all services where PaymentStatus = 'Not Paid'
    async fetchNotPaid(): Promise<ServicesRow[]> {
        const sql = `SELECT * FROM Services WHERE PaymentStatus = 'Not Paid'`;
        const [rows] = await db.execute<ServicesRow[]>(sql);
        return rows;
    }

    // Fetch all finance records by CustomerID
    async fetchFinanceByCustomerID(customerID: number): Promise<FinanceRow[]> {
        const sql = `SELECT * FROM Finance WHERE CustomerID = ?`;
        const [rows] = await db.execute<FinanceRow[]>(sql, [customerID]);
        return rows;
    }

    // Update a service PaymentStatus to 'Paid' by ServiceID
    async updateServicesToPaid(serviceID: number): Promise<boolean> {
        const sql = `UPDATE Services SET PaymentStatus = 'Paid' WHERE ServiceID = ?`;
        const [result] = await db.execute<ResultSetHeader>(sql, [serviceID]);
        return result.affectedRows > 0; // returns true if updated
    }
}
