import { Router } from "express";

import {
  createOrderPayment,
  readOrderPayment,
  updateOrderPayment,
  deleteOrderPayment,
  getOrderPaymentData
} from "../controllers/orderPayment";

const router = Router();

router.post("/add", createOrderPayment);

router.get("/get", readOrderPayment);

router.get("/get/:orderPayID", getOrderPaymentData);

router.put("/put/:orderPayID", updateOrderPayment);

router.delete("/delete/:orderPayID", deleteOrderPayment);

export default router;