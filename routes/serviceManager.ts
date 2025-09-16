import { Router } from "express";
import { getPendingServices, approveService } from "../controllers/serviceManager";

const router = Router();

// GET /services/pending -> fetch all pending & paid services
router.get("/pending", getPendingServices);

// PATCH /services/approve/:serviceID -> approve a pending service
router.patch("/approve/:serviceID", approveService);

export default router;
