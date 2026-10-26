
import { RowDataPacket } from "mysql2"

export type AllocationStatus =
    | "Pending"
    | "Allocated"
    | "Hauled"
    | "Parked"
    | "Returned"
    | "Cancelled"

export type InstrumentCondition = "CAT1" | "CAT2" | "CAT3" | "CAT4"

export interface AllocatedInstrumentRow extends RowDataPacket {
    allocatedequipmentid: number
    instrumentid: number
    serviceid: number
    regid: number
    lendid: number | null
    alloc_status: AllocationStatus
    conditionatalloc: InstrumentCondition
    conditionatreturn: InstrumentCondition | null
    allocdate: Date
    returndate: Date | null
    instrumentprice: number
    instrumentdescription: "Guitar" | "Piano" | "Violin" | "Ukulele"
    instrumentpurchasedate: Date
    instrumentdcondition: InstrumentCondition
    instrumentavailability: "Available" | "Unavailable"
}

export interface AllocatedInstrumentPayload {
    instrumentid: number
    serviceid: number
    regid: number
    lendid?: number | null
    alloc_status: AllocationStatus
    conditionatalloc: InstrumentCondition
    conditionatreturn?: InstrumentCondition | null
    allocdate: Date
    returndate?: Date | null
}

export interface AllocatedInstrumentPatch {
    alloc_status: AllocationStatus
    conditionatreturn?: InstrumentCondition | null
    returndate?: Date | null
}
