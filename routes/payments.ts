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
router.get("/get/:processID", getPaymentById);
router.put("/put/:processID", updatePayment);
router.delete("/delete/:processID", deletePayment);

export default router;
