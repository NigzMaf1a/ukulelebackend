import { Request, Response } from "express";
import Band from "../models/band";

const band = new Band();

// GET all bookings where BookStatus = 'Untick'
export const getUntickedBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await band.getUntickedBookings();
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings", error: err });
    }
};

// PATCH booking to mark BookStatus = 'Tick' by BookingID
export const markBookingTicked = async (req: Request, res: Response) => {
    const { bookingID } = req.params;

    if (!bookingID) {
        return res.status(400).json({ success: false, message: "BookingID is required" });
    }

    try {
        const updated = await band.updateBookingStatus(Number(bookingID));
        if (updated) {
            res.status(200).json({ success: true, message: "Booking marked as Tick" });
        } else {
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update booking", error: err });
    }
};
