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
router.get("/:equipmentID", getInventoryById);
router.put("/:equipmentID", updateInventory);
router.delete("/:equipmentID", deleteInventory);

export default router;
