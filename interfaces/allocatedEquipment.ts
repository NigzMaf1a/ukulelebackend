import { RowDataPacket } from "mysql2";

export interface AllocatedEquipmentRow extends RowDataPacket {
    allocatedequipmentid: number;
    equipmentid: number;
    lendid: number;
    regid: number;
    equipstatus: 'Not Returned' | 'Returned' | 'Inspected';
}

export interface AllocatedEquipmentPayload {
    equipmentid: number;
    lendid: number;
    regid: number;
    equipstatus: 'Not Returned' | 'Returned' | 'Inspected';
}