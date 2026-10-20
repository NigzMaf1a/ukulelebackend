"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class AllocatedInstrumentModel {
    constructor() { }
    async createAllocatedInstrument(data) {
        const sql = `
      WITH available_instrument AS (
        UPDATE public.instrument
        SET availability = 'Unavailable'
        WHERE instrumentid = $1
          AND availability = 'Available'
        RETURNING instrumentid
      )
      INSERT INTO public.allocatedinstrument (
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
    `;
        const rows = await (0, db_1.query)(sql, [
            data.instrumentid,
            data.serviceid,
            data.regid,
            data.lendid ?? null,
            data.alloc_status,
            data.conditionatalloc,
            data.conditionatreturn ?? null,
            data.allocdate,
            data.returndate ?? null
        ]);
        if (!rows.length) {
            throw new Error("Instrument is unavailable or does not exist");
        }
        return {
            message: "Instrument allocation created",
            id: rows[0].allocinstid
        };
    }
    async readAllocatedInstruments() {
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
      FROM public.allocatedinstrument ai
      INNER JOIN public.instrument i
        ON i.instrumentid = ai.instrumentid
      ORDER BY ai.allocinstid DESC
    `;
        return await (0, db_1.query)(sql);
    }
    async getAllocatedInstrumentData(allocInstID) {
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
      FROM public.allocatedinstrument ai
      INNER JOIN public.instrument i
        ON i.instrumentid = ai.instrumentid
      WHERE ai.allocinstid = $1
    `;
        const rows = await (0, db_1.query)(sql, [allocInstID]);
        return rows[0];
    }
    async patchAllocatedInstrument(allocInstID, data) {
        const sql = `
      WITH updated_allocation AS (
        UPDATE public.allocatedinstrument
        SET
          alloc_status = $1,
          conditionatreturn = $2,
          returndate = $3
        WHERE allocinstid = $4
        RETURNING allocinstid, instrumentid, alloc_status
      ),
      updated_instrument AS (
        UPDATE public.instrument i
        SET availability = CASE
          WHEN ua.alloc_status IN ('Returned', 'Cancelled')
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
    `;
        const rows = await (0, db_1.query)(sql, [
            data.alloc_status,
            data.conditionatreturn ?? null,
            data.returndate ?? null,
            allocInstID
        ]);
        return {
            message: "Instrument allocation updated",
            affectedRows: rows.length
        };
    }
    async deleteAllocatedInstrument(allocInstID) {
        const sql = `
      WITH deleted_allocation AS (
        DELETE FROM public.allocatedinstrument
        WHERE allocinstid = $1
        RETURNING allocinstid, instrumentid
      ),
      updated_instrument AS (
        UPDATE public.instrument i
        SET availability = 'Available'
        FROM deleted_allocation da
        WHERE i.instrumentid = da.instrumentid
        RETURNING i.instrumentid
      )
      SELECT da.allocinstid
      FROM deleted_allocation da
      INNER JOIN updated_instrument ui
        ON ui.instrumentid = da.instrumentid
    `;
        const rows = await (0, db_1.query)(sql, [allocInstID]);
        return {
            message: "Instrument allocation deleted",
            affectedRows: rows.length
        };
    }
}
exports.default = AllocatedInstrumentModel;
