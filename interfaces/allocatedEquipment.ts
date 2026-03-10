import { RowDataPacket } from "mysql2";

export interface AllocatedEquipmentRow extends RowDataPacket{
    AllocatedEquipmentID: number;
    EquipmentID: number;
    LendID: number;
    RegID:number;
    EquipStatus: 'Not Returned' | 'Returned' | 'Inspected';
}

export interface AllocatedEquipmentPayload{
    EquipmentID: number;
    LendID: number;
    RegID: number;
    EquipStatus: 'Not Returned' | 'Returned' | 'Inspected';
}