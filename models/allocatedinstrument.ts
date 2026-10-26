
import { query } from "../utils/db"
import {
  AllocatedInstrumentRow,
  AllocatedInstrumentPayload,
  AllocatedInstrumentPatch
} from "../interfaces/allocatedinstrument"

export default class AllocatedInstrumentModel {
  constructor() { }

  async createAllocatedInstrument(
    data: AllocatedInstrumentPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      WITH available_instrument AS (
        UPDATE instrument
        SET availability = 'Unavailable'
        WHERE instrumentid = $1
          AND availability = 'Available'
        RETURNING instrumentid
      )
      INSERT INTO allocatedinstrument (
        instrumentid,
        serviceid,
        regid,
        lendid,
        alloc_status,
        conditionatalloc,
        conditionatreturn,
        allocdate,
        returndate
      )
      SELECT
        ai.instrumentid,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      FROM available_instrument ai
      RETURNING allocinstid
    `

    const rows = await query<{ allocinstid: number }>(sql, [
      data.instrumentid,
      data.serviceid,
      data.regid,
      data.lendid ?? null,
      data.alloc_status,
      data.conditionatalloc,
      data.conditionatreturn ?? null,
      data.allocdate,
      data.returndate ?? null
    ])

    if (!rows.length) {
      throw new Error("Instrument is unavailable or does not exist")
    }

    return {
      message: "Instrument allocation created",
      id: rows[0].allocinstid
    }
  }

  async readAllocatedInstruments(): Promise<AllocatedInstrumentRow[]> {
    const sql = `
      SELECT
        ai.allocinstid,
        ai.instrumentid,
        ai.serviceid,
        ai.regid,
        ai.lendid,
        ai.alloc_status,
        ai.conditionatalloc,
        ai.conditionatreturn,
        ai.allocdate,
        ai.returndate,
        i.price AS instrumentprice,
        i.description AS instrumentdescription,
        i.purchasedate AS instrumentpurchasedate,
        i.dcondition AS instrumentdcondition,
        i.availability AS instrumentavailability
      FROM allocatedinstrument ai
      INNER JOIN instrument i
        ON i.instrumentid = ai.instrumentid
      ORDER BY ai.allocinstid DESC
    `

    return await query<AllocatedInstrumentRow>(sql)
  }

  async getAllocatedInstrumentData(
    allocInstID: number
  ): Promise<AllocatedInstrumentRow | undefined> {
    const sql = `
      SELECT
        ai.allocinstid,
        ai.instrumentid,
        ai.serviceid,
        ai.regid,
        ai.lendid,
        ai.alloc_status,
        ai.conditionatalloc,
        ai.conditionatreturn,
        ai.allocdate,
        ai.returndate,
        i.price AS instrumentprice,
        i.description AS instrumentdescription,
        i.purchasedate AS instrumentpurchasedate,
        i.dcondition AS instrumentdcondition,
        i.availability AS instrumentavailability
      FROM allocatedinstrument ai
      INNER JOIN instrument i
        ON i.instrumentid = ai.instrumentid
      WHERE ai.allocinstid = $1
    `

    const rows = await query<AllocatedInstrumentRow>(sql, [allocInstID])
    return rows[0]
  }

  async patchAllocatedInstrument(
    allocInstID: number,
    data: AllocatedInstrumentPatch
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      WITH updated_allocation AS (
        UPDATE allocatedinstrument
        SET
          alloc_status = $1,
          conditionatreturn = $2,
          returndate = $3
        WHERE allocinstid = $4
        RETURNING allocinstid, instrumentid, alloc_status
      ),
      updated_instrument AS (
        UPDATE instrument i
        SET availability = CASE
          WHEN ua.alloc_status IN ('Returned', 'Cancelled')
            AND NOT EXISTS (
              SELECT 1
              FROM allocatedinstrument other
              WHERE other.instrumentid = ua.instrumentid
                AND other.allocinstid <> ua.allocinstid
                AND other.alloc_status NOT IN ('Returned', 'Cancelled')
            )
          THEN 'Available'
          ELSE 'Unavailable'
        END
        FROM updated_allocation ua
        WHERE i.instrumentid = ua.instrumentid
        RETURNING i.instrumentid
      )
      SELECT ua.allocinstid
      FROM updated_allocation ua
      INNER JOIN updated_instrument ui
        ON ui.instrumentid = ua.instrumentid
    `

    const rows = await query<{ allocinstid: number }>(sql, [
      data.alloc_status,
      data.conditionatreturn ?? null,
      data.returndate ?? null,
      allocInstID
    ])

    return {
      message: "Instrument allocation updated",
      affectedRows: rows.length
    }
  }

  async deleteAllocatedInstrument(
    allocInstID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      WITH deleted_allocation AS (
        DELETE FROM allocatedinstrument
        WHERE allocinstid = $1
        RETURNING allocinstid, instrumentid
      ),
      updated_instrument AS (
        UPDATE instrument i
        SET availability = CASE
          WHEN EXISTS (
            SELECT 1
            FROM allocatedinstrument other
            WHERE other.instrumentid = da.instrumentid
              AND other.alloc_status NOT IN ('Returned', 'Cancelled')
          )
          THEN 'Unavailable'
          ELSE 'Available'
        END
        FROM deleted_allocation da
        WHERE i.instrumentid = da.instrumentid
        RETURNING i.instrumentid
      )
      SELECT da.allocinstid
      FROM deleted_allocation da
      INNER JOIN updated_instrument ui
        ON ui.instrumentid = da.instrumentid
    `

    const rows = await query<{ allocinstid: number }>(sql, [allocInstID])

    return {
      message: "Instrument allocation deleted",
      affectedRows: rows.length
    }
  }
}
