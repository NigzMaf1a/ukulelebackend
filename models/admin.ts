import db from "../utils/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { RegistrationRow, RegistrationPayload } from "../interfaces/registration";
import { FeedbackRow, FeedbackPayload } from "../interfaces/feedback";
import { AboutRow, AboutPayload } from "../interfaces/about";
import { ContactRow, ContactPayload } from "../interfaces/contact";
import { BookingRow } from "../interfaces/services";
import { LendingRow } from "../interfaces/services";
import { PenaltyRow } from "../interfaces/penalty";
import { InspectorRow } from "../interfaces/inspector";
import { InventoryRow } from "../interfaces/inventory";
import { FinanceRow } from "../interfaces/finance";
import { SupplyRow } from "../interfaces/supply";

export default class Admin {
    constructor() {}

    async fetchPendingUsers(): Promise<RegistrationRow[]> {
        try {
            const query = `SELECT * FROM Registration WHERE accStatus = 'Pending'`;
            const [rows] = await db.execute<RegistrationRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching pending users:", error);
            throw error;
        }
    }

    async fetchApprovedUsers(): Promise<RegistrationRow[]> {
        try {
            const query = `SELECT * FROM Registration WHERE accStatus = 'Approved'`;
            const [rows] = await db.execute<RegistrationRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching approved users:", error);
            throw error;
        }
    }

    async fetchInactiveUsers(): Promise<RegistrationRow[]> {
        try {
            const query = `SELECT * FROM Registration WHERE accStatus = 'Inactive'`;
            const [rows] = await db.execute<RegistrationRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching inactive users:", error);
            throw error;
        }
    }

    async fetchAllUsers(): Promise<RegistrationRow[]> {
        try {
            const query = `SELECT * FROM Registration`;
            const [rows] = await db.execute<RegistrationRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }

    async approvePendingUser(regID: number): Promise<boolean> {
        try {
            const query = `
                UPDATE Registration
                SET accStatus = 'Approved'
                WHERE RegID = ? AND accStatus = 'Pending'
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [regID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error approving pending user:", error);
            throw error;
        }
    }

    async deactivateActiveUser(regID: number): Promise<boolean> {
        try {
            const query = `
                UPDATE Registration
                SET accStatus = 'Inactive'
                WHERE RegID = ? AND accStatus = 'Approved'
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [regID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error deactivating active user:", error);
            throw error;
        }
    }

    async activateInactiveUser(regID: number): Promise<boolean> {
        try {
            const query = `
                UPDATE Registration
                SET accStatus = 'Pending'
                WHERE RegID = ? AND accStatus = 'Inactive'
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [regID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error activating inactive user:", error);
            throw error;
        }
    }

    async fetchFeedback(): Promise<FeedbackRow[]> {
        try {
            const query = `SELECT * FROM Feedback`;
            const [rows] = await db.execute<FeedbackRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching feedback:", error);
            throw error;
        }
    }

    async addFeedbackResponse(feedbackID: number, response: string): Promise<boolean> {
        try {
            const query = `
                UPDATE Feedback
                SET Response = ?
                WHERE FeedbackID = ?
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [response, feedbackID]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error adding feedback response:", error);
            throw error;
        }
    }

    async fetchAbout(): Promise<AboutRow | null> {
        try {
            const query = `SELECT * FROM About LIMIT 1`;
            const [rows] = await db.execute<AboutRow[] & RowDataPacket[]>(query);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching about detail:", error);
            throw error;
        }
    }

    async fetchContacts(): Promise<ContactRow | null> {
        try {
            const query = `SELECT * FROM Contact LIMIT 1`;
            const [rows] = await db.execute<ContactRow[] & RowDataPacket[]>(query);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching contact details:", error);
            throw error;
        }
    }

    async updateAbout(detail: string): Promise<boolean> {
        try {
            const query = `
                UPDATE About
                SET Detail = ?
                LIMIT 1
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [detail]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating About detail:", error);
            throw error;
        }
    }
    async updateContacts(payload: ContactPayload): Promise<boolean> {
        try {
            const query = `
                UPDATE Contact
                SET
                    PhoneNo = ?,
                    EmailAddress = ?,
                    Instagram = ?,
                    Facebook = ?,
                    POBox = ?
                LIMIT 1
            `;

            const [result] = await db.execute<ResultSetHeader>(query, [
                payload.PhoneNo,
                payload.EmailAddress,
                payload.Instagram,
                payload.Facebook,
                payload.PoBox,
            ]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating contact details:", error);
            throw error;
        }
    }

    async fetchBookings(): Promise<BookingRow[]> {
        try {
            const query = `SELECT * FROM Booking`;
            const [rows] = await db.execute<BookingRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw error;
        }
    }

    async fetchLending(): Promise<LendingRow[]> {
        try {
            const query = `SELECT * FROM Lending`;
            const [rows] = await db.execute<LendingRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching lending records:", error);
            throw error;
        }
    }

    async fetchPenalties(): Promise<PenaltyRow[]> {
        try {
            const query = `SELECT * FROM Penalty`;
            const [rows] = await db.execute<PenaltyRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching penalty records:", error);
            throw error;
        }
    }

    async fetchInspection(): Promise<InspectorRow[]> {
        try {
            const query = `SELECT * FROM Inspector`;
            const [rows] = await db.execute<InspectorRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching inspection records:", error);
            throw error;
        }
    }
    
    async fetchInventory(): Promise<InventoryRow[]> {
        try {
            const query = `SELECT * FROM Inventory`;
            const [rows] = await db.execute<InventoryRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching inventory records:", error);
            throw error;
        }
    }

    async fetchFinances(): Promise<FinanceRow[]> {
        try {
            const query = `
                SELECT
                    CustomerID,
                    Name,
                    PhoneNo,
                    TransactionID,
                    TransactionName,
                    TransactionDate,
                    Amount,
                    TransactType,
                    ServiceID
                FROM Finance
            `;
            const [rows] = await db.execute<FinanceRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching finance records:", error);
            throw error;
        }
    }

    async fetchSupplies(): Promise<SupplyRow[]> {
        try {
            const query = `SELECT * FROM Supply`;
            const [rows] = await db.execute<SupplyRow[] & RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.error("Error fetching supplies:", error);
            throw error;
        }
    }
}
