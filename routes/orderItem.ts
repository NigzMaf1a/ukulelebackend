import { Router } from "express";

import {
  createOrderItem,
  readOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getOrderItemData
} from "../controllers/orderItem";

const router = Router();

router.post("/add", createOrderItem);

router.get("/get", readOrderItem);

router.get("/get/:orderItemID", getOrderItemData);

router.put("/put/:orderItemID", updateOrderItem);

router.delete("/delete/:orderItemID", deleteOrderItem);

export default router;