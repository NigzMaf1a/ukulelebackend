
import { Router } from "express"
import {
  createAllocatedEquipment,
  getAllAllocatedEquipment,
  getAllocatedEquipmentById,
  patchAllocatedEquipment,
  deleteAllocatedEquipment
} from "../controllers/allocatedequipment"

const router = Router()

router.post("/add", createAllocatedEquipment)
router.get("/get", getAllAllocatedEquipment)
router.get("/get/byid/:allocEquipID", getAllocatedEquipmentById)
router.patch("/patch/:allocEquipID", patchAllocatedEquipment)
router.delete("/delete/:allocEquipID", deleteAllocatedEquipment)

export default router
