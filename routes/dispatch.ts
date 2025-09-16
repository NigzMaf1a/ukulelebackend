import { Router } from "express";
import {
  createDispatch,
  getAllDispatches,
  getDispatchById,
  updateDispatch,
  deleteDispatch,
} from "../controllers/dispatch";

const router = Router();

router.post("/add", createDispatch);
router.get("/get", getAllDispatches);
router.get("/:dispatchID", getDispatchById);
router.put("/:dispatchID", updateDispatch);
router.delete("/:dispatchID", deleteDispatch);

export default router;
