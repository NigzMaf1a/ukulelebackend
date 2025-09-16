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

    async addFeedbackResponse() {}
    async fetchAbout() {}
    async fetchContacts() {}
    async updateAbout() {}
    async updateContacts() {}
    async fetchBookings() {}
    async fetchLending() {}
    async fetchPenalties() {}
    async fetchInspection() {}
    async fetchInventory() {}
    async fetchFinances() {}
    async fetchSupplies() {}
}
