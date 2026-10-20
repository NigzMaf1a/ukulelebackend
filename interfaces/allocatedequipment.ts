
import { RowDataPacket } from "mysql2"

export type EquipmentAllocationStatus =
    | "Pending"
    | "Allocated"
    | "Hauled"
    | "Parked"
    | "Returned"
    | "Cancelled"

export type EquipmentCondition = "CAT1" | "CAT2" | "CAT3" | "CAT4"

export interface AllocatedEquipmentRow extends RowDataPacket {
    allocequipid: number
    equipmentid: number
    serviceid: number
    regid: number
    lendid: number | null
    alloc_status: EquipmentAllocationStatus
    conditionatalloc: EquipmentCondition
    conditionatreturn: EquipmentCondition | null
    allocdate: Date
    returndate: Date | null
    equipmentprice: number
    equipmentdescription: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless"
    equipmentpurchasedate: Date
    equipmentdcondition: EquipmentCondition
    equipmentavailability: "Available" | "Unavailable"
}

export interface AllocatedEquipmentPayload {
    equipmentid: number
    serviceid: number
    regid: number
    lendid?: number | null
    alloc_status: EquipmentAllocationStatus
    conditionatalloc: EquipmentCondition
    conditionatreturn?: EquipmentCondition | null
    allocdate: Date
    returndate?: Date | null
}

export interface AllocatedEquipmentPatch {
    alloc_status: EquipmentAllocationStatus
    conditionatreturn?: EquipmentCondition | null
    returndate?: Date | null
}
