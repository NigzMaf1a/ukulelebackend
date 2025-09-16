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
router.get("/:customerID", getCustomerById);
router.put("/:customerID", updateCustomer);
router.delete("/:customerID", deleteCustomer);

export default router;
