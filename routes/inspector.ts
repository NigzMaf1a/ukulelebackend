import { Router } from "express";
import {
  createInspector,
  getAllInspectors,
  getInspectorById,
  updateInspector,
  deleteInspector,
} from "../controllers/inspector";

const router = Router();

router.post("/add", createInspector);
router.get("/get", getAllInspectors);
router.get("/:inspectionID", getInspectorById);
router.put("/:inspectionID", updateInspector);
router.delete("/:inspectionID", deleteInspector);

export default router;
