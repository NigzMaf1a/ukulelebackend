import { query } from "../utils/db";
import { ServicesRow } from "../interfaces/services";

export default class ServiceManager {
  constructor() {}

  /**
   * Fetch all services that are Paid but still Pending
   */
  async fetchPending(): Promise<ServicesRow[]> {
    const sql = `
      SELECT *
      FROM Services
      WHERE PaymentStatus = 'Paid' AND ServiceStatus = 'Pending'
    `;
    return await query<ServicesRow>(sql);
  }

  /**
   * Approve a pending service by ID
   * Returns true if a row was updated
   */
  async approvePending(serviceID: number): Promise<boolean> {
    const sql = `
      UPDATE Services
      SET ServiceStatus = 'Approved'
      WHERE ServiceID = ? AND ServiceStatus = 'Pending'
    `;
    const result = await query<{ affectedRows: number }>(sql, [serviceID]);
    return (result as any).affectedRows > 0;
  }
}