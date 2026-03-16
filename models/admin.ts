// Admin.ts
import { query } from "../utils/db";
import { 
  RegistrationRow, RegistrationPayload 
} from "../interfaces/registration";
import { FeedbackRow, FeedbackPayload } from "../interfaces/feedback";
import { AboutRow, AboutPayload } from "../interfaces/about";
import { ContactRow, ContactPayload } from "../interfaces/contact";
import { BookingRow } from "../interfaces/band";
import LendingRow from "../interfaces/services";
import { PenaltyRow } from "../interfaces/penalty";
import { InspectorRow } from "../interfaces/inspector";
import { InventoryRow } from "../interfaces/inventory";
import { FinanceRow } from "../interfaces/finance";
import { SupplyRow } from "../interfaces/supply";

export default class Admin {
  constructor() {}

  // --- User management ---
  async fetchPendingUsers(): Promise<RegistrationRow[]> {
    return query<RegistrationRow>(
      `SELECT * FROM Registration WHERE accStatus = 'Pending'`
    );
  }

  async fetchApprovedUsers(): Promise<RegistrationRow[]> {
    return query<RegistrationRow>(
      `SELECT * FROM Registration WHERE accStatus = 'Approved'`
    );
  }

  async fetchInactiveUsers(): Promise<RegistrationRow[]> {
    return query<RegistrationRow>(
      `SELECT * FROM Registration WHERE accStatus = 'Inactive'`
    );
  }

  async fetchAllUsers(): Promise<RegistrationRow[]> {
    return query<RegistrationRow>(`SELECT * FROM Registration`);
  }

  async approvePendingUser(regID: number): Promise<boolean> {
    const sql = `
      UPDATE Registration
      SET accStatus = 'Approved'
      WHERE RegID = $1 AND accStatus = 'Pending'
    `;
    const res = await query(sql, [regID]);
    return (res as any).rowCount > 0;
  }

  async deactivateActiveUser(regID: number): Promise<boolean> {
    const sql = `
      UPDATE Registration
      SET accStatus = 'Inactive'
      WHERE RegID = $1 AND accStatus = 'Approved'
    `;
    const res = await query(sql, [regID]);
    return (res as any).rowCount > 0;
  }

  async activateInactiveUser(regID: number): Promise<boolean> {
    const sql = `
      UPDATE Registration
      SET accStatus = 'Pending'
      WHERE RegID = $1 AND accStatus = 'Inactive'
    `;
    const res = await query(sql, [regID]);
    return (res as any).rowCount > 0;
  }

  // --- Feedback ---
  async fetchFeedback(): Promise<FeedbackRow[]> {
    return query<FeedbackRow>(`SELECT * FROM Feedback`);
  }

  async addFeedbackResponse(feedbackID: number, response: string): Promise<boolean> {
    const sql = `
      UPDATE Feedback
      SET Response = $1
      WHERE FeedbackID = $2
    `;
    const res = await query(sql, [response, feedbackID]);
    return (res as any).rowCount > 0;
  }

  // --- About ---
  async fetchAbout(): Promise<AboutRow | null> {
    const rows = await query<AboutRow>(`SELECT * FROM About LIMIT 1`);
    return rows[0] || null;
  }

  async updateAbout(detail: string): Promise<boolean> {
    const res = await query(`UPDATE About SET Detail = $1`, [detail]);
    return (res as any).rowCount > 0;
  }

  // --- Contacts ---
  async fetchContacts(): Promise<ContactRow | null> {
    const rows = await query<ContactRow>(`SELECT * FROM Contact LIMIT 1`);
    return rows[0] || null;
  }

  async updateContacts(payload: ContactPayload): Promise<boolean> {
    const sql = `
      UPDATE Contact
      SET PhoneNo = $1,
          EmailAddress = $2,
          Instagram = $3,
          Facebook = $4,
          POBox = $5
    `;
    const res = await query(sql, [
      payload.PhoneNo,
      payload.EmailAddress,
      payload.Instagram,
      payload.Facebook,
      payload.PoBox,
    ]);
    return (res as any).rowCount > 0;
  }

  // --- Bookings ---
  async fetchBookings(): Promise<BookingRow[]> {
    return query<BookingRow>(`SELECT * FROM Booking`);
  }

  // --- Lending ---
  async fetchLending(): Promise<LendingRow[]> {
    return query<LendingRow>(`SELECT * FROM Lending`);
  }

  // --- Penalties ---
  async fetchPenalties(): Promise<PenaltyRow[]> {
    return query<PenaltyRow>(`SELECT * FROM Penalty`);
  }

  // --- Inspectors ---
  async fetchInspection(): Promise<InspectorRow[]> {
    return query<InspectorRow>(`SELECT * FROM Inspector`);
  }

  // --- Inventory ---
  async fetchInventory(): Promise<InventoryRow[]> {
    return query<InventoryRow>(`SELECT * FROM Inventory`);
  }

  // --- Finances ---
  async fetchFinances(): Promise<FinanceRow[]> {
    const sql = `
      SELECT CustomerID, Name, PhoneNo, TransactionID, TransactionName,
             TransactionDate, Amount, TransactType, ServiceID
      FROM Finance
    `;
    return query<FinanceRow>(sql);
  }

  // --- Supplies ---
  async fetchSupplies(): Promise<SupplyRow[]> {
    return query<SupplyRow>(`SELECT * FROM Supply`);
  }

  // --- Admin record by RegID ---
  async loggedInAdmin(RegID: number): Promise<RegistrationRow[]> {
    const rows = await query<RegistrationRow>(
      `SELECT * FROM Registration WHERE RegID = $1 LIMIT 1`,
      [RegID]
    );
    return rows;
  }
}