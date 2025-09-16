import { Router } from "express";
import {
  getPendingUsers,
  getApprovedUsers,
  getInactiveUsers,
  getAllUsers,
  getFeedback,
  getAbout,
  getContacts,
  getBookings,
  getLending,
  getPenalties,
  getInspection,
  getInventory,
  getFinances,
  getSupplies,
} from "../controllers/admin";

const router = Router();

// Registration endpoints
router.get("/users/pending", getPendingUsers);
router.get("/users/approved", getApprovedUsers);
router.get("/users/inactive", getInactiveUsers);
router.get("/users/all", getAllUsers);

// Content
router.get("/feedback", getFeedback);
router.get("/about", getAbout);
router.get("/contacts", getContacts);

// Services
router.get("/bookings", getBookings);
router.get("/lending", getLending);
router.get("/penalties", getPenalties);
router.get("/inspection", getInspection);
router.get("/inventory", getInventory);
router.get("/finances", getFinances);
router.get("/supplies", getSupplies);

export default router;
