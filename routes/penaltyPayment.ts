import { Router } from "express";

import {
  createPenaltyPayment,
  readPenaltyPayment,
  updatePenaltyPayment,
  deletePenaltyPayment,
  getPenaltyPaymentData
} from "../controllers/penaltyPayment";

const router = Router();

router.post("/add", createPenaltyPayment);

router.get("/get", readPenaltyPayment);

router.get("/get/:penaltyPaymentID", getPenaltyPaymentData);

router.put("/put/:penaltyPaymentID", updatePenaltyPayment);

router.delete("/delete/:penaltyPaymentID", deletePenaltyPayment);

export default router;