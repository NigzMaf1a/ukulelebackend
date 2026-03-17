"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const allocatedEquipment_1 = require("../controllers/allocatedEquipment");
const router = (0, express_1.Router)();
// CREATE
router.post("/add", allocatedEquipment_1.createAllocatedEquipment);
// READ ALL
router.get("/get", allocatedEquipment_1.readAllocatedEquipment);
// READ ONE
router.get("/get/:allocatedEquipmentID", allocatedEquipment_1.getAllocatedEquipmentData);
// UPDATE
router.put("/put/:allocatedEquipmentID", allocatedEquipment_1.updateAllocatedEquipment);
// DELETE
router.delete("/delete/:allocatedEquipmentID", allocatedEquipment_1.deleteAllocatedEquipment);
exports.default = router;
