import express from "express";
import { getNonPerformedLendings, updateLendingPerformed } from "../controllers/soundsystem";

const router = express.Router();

// GET all lendings not yet performed
router.get("/lendings/non-performed", getNonPerformedLendings);

// PATCH lending to mark as performed by LendID
router.patch("/lendings/:lendID/perform", updateLendingPerformed);

export default router;
