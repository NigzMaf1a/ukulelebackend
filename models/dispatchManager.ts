import { query } from "../utils/db";
import { DispatchRow } from "../interfaces/dispatch";

export default class DispatchManager {
  constructor() {}

  async fetchUndispatched(): Promise<DispatchRow[]> {
    const sql = `
      SELECT * FROM Dispatch
      WHERE Dispatched = 'No'
    `;
    return await query<DispatchRow>(sql);
  }

  async updateDispatch(dispatchID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Dispatch
      SET Dispatched = 'Yes'
      WHERE DispatchID = $1 AND Dispatched = 'No'
    `;
    const res = await query(sql, [dispatchID]);
    return { message: "Dispatch updated", affectedRows: (res as any).rowCount || 0 };
  }
}