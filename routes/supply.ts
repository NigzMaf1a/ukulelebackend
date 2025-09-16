import { Router } from "express";
import {
  createSupply,
  getAllSupplies,
  getSupplyById,
  updateSupply,
  deleteSupply,
} from "../controllers/supply";

const router = Router();

router.post("/add", createSupply);
router.get("/get", getAllSupplies);
router.get("/:supplyID", getSupplyById);
router.put("/:supplyID", updateSupply);
router.delete("/:supplyID", deleteSupply);

export default router;
