import { Router } from "express";
import {
  createLending,
  getAllLending,
  getLendingById,
  updateLending,
  deleteLending,
} from "../controllers/lending";

const router = Router();

router.post("/add", createLending);
router.get("/get", getAllLending);
router.get("/get/byid/:lendID", getLendingById);
router.put("/put/:lendID", updateLending);
router.delete("/delete/:lendID", deleteLending);

export default router;
