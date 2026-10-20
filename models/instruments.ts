
import { query } from "../utils/db"
import { InstrumentRow, InstrumentPayload } from "../interfaces/instrument"

export default class InstrumentModel {
    constructor() { }

    async createInstrument(
        data: InstrumentPayload
    ): Promise<{ message: string; id: number }> {
        const sql = `
      INSERT INTO Instrument
        (Price, Description, PurchaseDate, dCondition, Availability)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING InstrumentID AS instrumentid
    `

        const rows = await query<{ instrumentid: number }>(sql, [
            data.price,
            data.description,
            data.purchasedate,
            data.dcondition,
            data.availability
        ])

        return {
            message: "Instrument record created",
            id: rows[0].instrumentid
        }
    }

    async readInstruments(): Promise<InstrumentRow[]> {
        const sql = `SELECT * FROM Instrument`
        return await query<InstrumentRow>(sql)
    }

    async updateInstrument(
        instrumentID: number,
        data: InstrumentPayload
    ): Promise<{ message: string; affectedRows: number }> {
        const sql = `
      UPDATE Instrument
      SET Price = $1,
          Description = $2,
          PurchaseDate = $3,
          dCondition = $4,
          Availability = $5
      WHERE InstrumentID = $6
    `

        const res = await query(sql, [
            data.price,
            data.description,
            data.purchasedate,
            data.dcondition,
            data.availability,
            instrumentID
        ])

        return {
            message: "Instrument record updated",
            affectedRows: (res as any).rowCount || 0
        }
    }

    async deleteInstrument(
        instrumentID: number
    ): Promise<{ message: string; affectedRows: number }> {
        const sql = `DELETE FROM Instrument WHERE InstrumentID = $1`
        const res = await query(sql, [instrumentID])

        return {
            message: "Instrument record deleted",
            affectedRows: (res as any).rowCount || 0
        }
    }

    async getInstrumentData(
        instrumentID: number
    ): Promise<InstrumentRow | undefined> {
        const sql = `SELECT * FROM Instrument WHERE InstrumentID = $1`
        const rows = await query<InstrumentRow>(sql, [instrumentID])

        return rows[0]
    }
}
