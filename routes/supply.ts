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
router.get("get/byid/:supplyID", getSupplyById);
router.put("/put/:supplyID", updateSupply);
router.delete("/delete/:supplyID", deleteSupply);

export default router;
