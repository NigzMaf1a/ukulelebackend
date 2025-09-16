import { Router } from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/payments";

const router = Router();

router.post("/add", createPayment);
router.get("/get", getAllPayments);
router.get("/:processID", getPaymentById);
router.put("/:processID", updatePayment);
router.delete("/:processID", deletePayment);

export default router;
