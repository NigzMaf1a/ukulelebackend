export default interface AllocatedEquipment {
    allocequipid?: number
    equipmentid?: number
    serviceid: number
    regid: number
    alloc_status: 'Pending' | 'Allocated' | 'Hauled' | 'Parked' | 'Returned' | 'Cancelled'
    conditionatalloc: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4'
    conditionatreturn: undefined | 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4'
    allocdate: Date
    returndate: Date | undefined
}

export interface AllocatedEquipmentPatch {
    alloc_status: 'Pending' | 'Allocated' | 'Hauled' | 'Parked' | 'Returned' | 'Cancelled'
    conditionatreturn: undefined | 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4'
    returndate: Date | undefined
}