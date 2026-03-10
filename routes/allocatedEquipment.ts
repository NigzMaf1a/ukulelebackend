import { Router } from "express";

import {
  createAllocatedEquipment,
  readAllocatedEquipment,
  updateAllocatedEquipment,
  deleteAllocatedEquipment,
  getAllocatedEquipmentData
} from "../controllers/allocatedEquipment";

const router = Router();

// CREATE
router.post("/add", createAllocatedEquipment);

// READ ALL
router.get("/get", readAllocatedEquipment);

// READ ONE
router.get("/get/:allocatedEquipmentID", getAllocatedEquipmentData);

// UPDATE
router.put("/put/:allocatedEquipmentID", updateAllocatedEquipment);

// DELETE
router.delete("/delete/:allocatedEquipmentID", deleteAllocatedEquipment);

export default router;