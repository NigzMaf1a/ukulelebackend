"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markBookingTicked = exports.getUntickedBookings = void 0;
const band_1 = __importDefault(require("../models/band"));
const band = new band_1.default();
// GET all bookings where BookStatus = 'Untick'
const getUntickedBookings = async (req, res) => {
    try {
        const bookings = await band.getUntickedBookings();
        res.status(200).json({ success: true, data: bookings });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings", error: err });
    }
};
exports.getUntickedBookings = getUntickedBookings;
// PATCH booking to mark BookStatus = 'Tick' by BookingID
const markBookingTicked = async (req, res) => {
    const { bookingID } = req.params;
    if (!bookingID) {
        return res.status(400).json({ success: false, message: "BookingID is required" });
    }
    try {
        const updated = await band.updateBookingStatus(Number(bookingID));
        if (updated) {
            res.status(200).json({ success: true, message: "Booking marked as Tick" });
        }
        else {
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to update booking", error: err });
    }
};
exports.markBookingTicked = markBookingTicked;
