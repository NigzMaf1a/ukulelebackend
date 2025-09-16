import { Router } from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  updateServiceStatus,
  updatePaymentStatus,
  deleteService,
} from "../controllers/services";

const router = Router();

router.post("/add", createService);
router.get("/get", getAllServices);
router.get("/:serviceID", getServiceById);
router.put("/:serviceID", updateService);
router.patch("/:serviceID/status", updateServiceStatus); // update ServiceStatus only
router.patch("/:serviceID/payment", updatePaymentStatus); // update PaymentStatus only
router.delete("/:serviceID", deleteService);

export default router;
