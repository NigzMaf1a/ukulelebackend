import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/booking";

const router = Router();

router.post("/add", createBooking);
router.get("/get", getAllBookings);
router.get("/:bookingID", getBookingById);
router.put("/:bookingID", updateBooking);
router.delete("/:bookingID", deleteBooking);

export default router;
