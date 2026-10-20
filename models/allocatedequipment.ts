
import { query } from "../utils/db"
import {
  AllocatedEquipmentRow,
  AllocatedEquipmentPayload,
  AllocatedEquipmentPatch
} from "../interfaces/allocatedequipment"

export default class AllocatedEquipmentModel {
  constructor() { }

  async createAllocatedEquipment(
    data: AllocatedEquipmentPayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
      WITH available_equipment AS (
        UPDATE public.inventory
        SET availability = 'Unavailable'
        WHERE equipmentid = $1
          AND availability = 'Available'
        RETURNING equipmentid
      )
      INSERT INTO public.allocatedequipment (
        equipmentid,
        lendid,
        regid,
        serviceid,
        alloc_status,
        conditionatalloc,
        conditionatreturn,
        allocdate,
        returndate
      )
      SELECT
        ae.equipmentid,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      FROM available_equipment ae
      RETURNING allocequipid
    `

    const rows = await query<{ allocequipid: number }>(sql, [
      data.equipmentid,
      data.lendid ?? null,
      data.regid,
      data.serviceid,
      data.alloc_status,
      data.conditionatalloc,
      data.conditionatreturn ?? null,
      data.allocdate,
      data.returndate ?? null
    ])

    if (!rows.length) {
      throw new Error("Equipment is unavailable or does not exist")
    }

    return {
      message: "Equipment allocation created",
      id: rows[0].allocequipid
    }
  }

  async readAllocatedEquipment(): Promise<AllocatedEquipmentRow[]> {
    const sql = `
      SELECT
        ae.allocequipid,
        ae.equipmentid,
        ae.serviceid,
        ae.regid,
        ae.lendid,
        ae.alloc_status,
        ae.conditionatalloc,
        ae.conditionatreturn,
        ae.allocdate,
        ae.returndate,
        i.price AS equipmentprice,
        i.description AS equipmentdescription,
        i.purchasedate AS equipmentpurchasedate,
        i.dcondition AS equipmentdcondition,
        i.availability AS equipmentavailability
      FROM public.allocatedequipment ae
      INNER JOIN public.inventory i
        ON i.equipmentid = ae.equipmentid
      ORDER BY ae.allocequipid DESC
    `

    return await query<AllocatedEquipmentRow>(sql)
  }

  async getAllocatedEquipmentData(
    allocEquipID: number
  ): Promise<AllocatedEquipmentRow | undefined> {
    const sql = `
      SELECT
        ae.allocequipid,
        ae.equipmentid,
        ae.serviceid,
        ae.regid,
        ae.lendid,
        ae.alloc_status,
        ae.conditionatalloc,
        ae.conditionatreturn,
        ae.allocdate,
        ae.returndate,
        i.price AS equipmentprice,
        i.description AS equipmentdescription,
        i.purchasedate AS equipmentpurchasedate,
        i.dcondition AS equipmentdcondition,
        i.availability AS equipmentavailability
      FROM public.allocatedequipment ae
      INNER JOIN public.inventory i
        ON i.equipmentid = ae.equipmentid
      WHERE ae.allocequipid = $1
    `

    const rows = await query<AllocatedEquipmentRow>(sql, [allocEquipID])
    return rows[0]
  }

  async patchAllocatedEquipment(
    allocEquipID: number,
    data: AllocatedEquipmentPatch
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      WITH updated_allocation AS (
        UPDATE public.allocatedequipment
        SET
          alloc_status = $1,
          conditionatreturn = $2,
          returndate = $3
        WHERE allocequipid = $4
        RETURNING allocequipid, equipmentid, alloc_status
      ),
      updated_inventory AS (
        UPDATE public.inventory i
        SET availability = CASE
          WHEN ua.alloc_status IN ('Returned', 'Cancelled')
            AND NOT EXISTS (
              SELECT 1
              FROM public.allocatedequipment other
              WHERE other.equipmentid = ua.equipmentid
                AND other.allocequipid <> ua.allocequipid
                AND other.alloc_status NOT IN ('Returned', 'Cancelled')
            )
          THEN 'Available'
          ELSE 'Unavailable'
        END
        FROM updated_allocation ua
        WHERE i.equipmentid = ua.equipmentid
        RETURNING i.equipmentid
      )
      SELECT ua.allocequipid
      FROM updated_allocation ua
      INNER JOIN updated_inventory ui
        ON ui.equipmentid = ua.equipmentid
    `

    const rows = await query<{ allocequipid: number }>(sql, [
      data.alloc_status,
      data.conditionatreturn ?? null,
      data.returndate ?? null,
      allocEquipID
    ])

    return {
      message: "Equipment allocation updated",
      affectedRows: rows.length
    }
  }

  async deleteAllocatedEquipment(
    allocEquipID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      WITH deleted_allocation AS (
        DELETE FROM public.allocatedequipment
        WHERE allocequipid = $1
        RETURNING allocequipid, equipmentid
      ),
      updated_inventory AS (
        UPDATE public.inventory i
        SET availability = CASE
          WHEN EXISTS (
            SELECT 1
            FROM public.allocatedequipment other
            WHERE other.equipmentid = deleted_allocation.equipmentid
              AND other.alloc_status NOT IN ('Returned', 'Cancelled')
          )
          THEN 'Unavailable'
          ELSE 'Available'
        END
        FROM deleted_allocation
        WHERE i.equipmentid = deleted_allocation.equipmentid
        RETURNING i.equipmentid
      )
      SELECT da.allocequipid
      FROM deleted_allocation da
      INNER JOIN updated_inventory ui
        ON ui.equipmentid = da.equipmentid
    `

    const rows = await query<{ allocequipid: number }>(sql, [allocEquipID])

    return {
      message: "Equipment allocation deleted",
      affectedRows: rows.length
    }
  }
}
