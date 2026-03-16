import { Router } from "express";

import {
  createOrder,
  readOrders,
  updateOrder,
  deleteOrder,
  getOrderData
} from "../controllers/orders";

const router = Router();

router.post("/add", createOrder);

router.get("/get", readOrders);

router.get("/get/:orderID", getOrderData);

router.put("/put/:orderID", updateOrder);

router.delete("/delete/:orderID", deleteOrder);

export default router;