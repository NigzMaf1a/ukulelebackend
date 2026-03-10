import { Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer";

const router = Router();

router.post("/add", createCustomer);
router.get("/get", getAllCustomers);
router.get("/get/byid/:customerID", getCustomerById);
router.put("/put/:customerID", updateCustomer);
router.delete("/delete/:customerID", deleteCustomer);

export default router;
