import { Router } from "express";
import {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from "../controllers/inventory";

const router = Router();

router.post("/add", createInventory);
router.get("/get", getAllInventory);
router.get("/get/byid/:equipmentID", getInventoryById);
router.put("/put/:equipmentID", updateInventory);
router.delete("/delete/:equipmentID", deleteInventory);

export default router;
