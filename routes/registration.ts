import { Router } from "express";
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration
} from "../controllers/registration";

const router = Router();

router.post("/add", createRegistration);
router.get("/get", getAllRegistrations);
router.get("/get/byid/:regID", getRegistrationById);
router.put("/put/:regID", updateRegistration);
router.delete("/delete/:regID", deleteRegistration);

export default router;