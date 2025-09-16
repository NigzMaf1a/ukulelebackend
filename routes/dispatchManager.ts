import { Router } from "express";
import { getUndispatched, markDispatched } from "../controllers/dispatchManager";

const router = Router();

// GET /dispatch/undispatched -> fetch all records where Dispatched = 'No'
router.get("/undispatched", getUndispatched);

// PATCH /dispatch/update/:dispatchID -> mark a dispatch record as Dispatched = 'Yes'
router.patch("/update/:dispatchID", markDispatched);

export default router;
