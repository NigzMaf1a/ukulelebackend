import { Router } from "express";
import {
  createPenalty,
  getAllPenalties,
  getPenaltyById,
  updatePenalty,
  deletePenalty,
} from "../controllers/penalty";

const router = Router();

router.post("/add", createPenalty);
router.get("/get", getAllPenalties);
router.get("/get/byid/:penaltyID", getPenaltyById);
router.put("/put/:penaltyID", updatePenalty);
router.delete("/delete/:penaltyID", deletePenalty);

export default router;
