import express from "express";
import { getUntickedBookings, markBookingTicked } from "../controllers/band";

const router = express.Router();

// GET all bookings where BookStatus = 'Untick'
router.get("/bookings/unticked", getUntickedBookings);

// PATCH booking to mark BookStatus = 'Tick'
router.patch("/bookings/:bookingID/tick", markBookingTicked);

export default router;
