import { Router } from "express";
import {
  createFinance,
  getAllFinance,
  getFinanceById,
  updateFinance,
  deleteFinance,
} from "../controllers/finance";

const router = Router();

router.post("/add", createFinance);
router.get("/get", getAllFinance);
router.get("/get/byid/:transactionID", getFinanceById);
router.put("/put/:transactionID", updateFinance);
router.delete("/delete/:transactionID", deleteFinance);

export default router;
