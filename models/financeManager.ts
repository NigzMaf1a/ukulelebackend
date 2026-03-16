import { query } from "../utils/db";
import { ServicesRow } from "../interfaces/services";
import { FinanceRow } from "../interfaces/finance";

export default class FinanceManagerModel {
  constructor() {}

  async fetchNotPaid(): Promise<ServicesRow[]> {
    const sql = `SELECT * FROM Services WHERE PaymentStatus = 'Not Paid'`;
    return await query<ServicesRow>(sql);
  }

  async fetchFinanceByCustomerID(customerID: number): Promise<FinanceRow[]> {
    const sql = `SELECT * FROM Finance WHERE CustomerID = $1`;
    return await query<FinanceRow>(sql, [customerID]);
  }

  async updateServicesToPaid(serviceID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE Services SET PaymentStatus = 'Paid' WHERE ServiceID = $1`;
    const res = await query(sql, [serviceID]);
    return { message: "Service marked as paid", affectedRows: (res as any).rowCount || 0 };
  }
}