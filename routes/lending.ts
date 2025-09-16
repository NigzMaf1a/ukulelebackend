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
router.get("/:lendID", getLendingById);
router.put("/:lendID", updateLending);
router.delete("/:lendID", deleteLending);

export default router;
