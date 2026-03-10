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
router.get("/get/byid/:bookingID", getBookingById);
router.put("/put/:bookingID", updateBooking);
router.delete("/delete/:bookingID", deleteBooking);

export default router;
