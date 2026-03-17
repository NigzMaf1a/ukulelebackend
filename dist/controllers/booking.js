"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getBookingById = exports.getAllBookings = exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
/**
 * CREATE - Add a new booking
 */
const createBooking = async (req, res) => {
    try {
        const payload = req.body;
        const bookingModel = new booking_1.default();
        const result = await bookingModel.createBooking(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res
            .status(500)
            .json({ error: "Failed to create booking", details: message });
    }
};
exports.createBooking = createBooking;
/**
 * READ - Fetch all bookings
 */
const getAllBookings = async (_req, res, next) => {
    try {
        const bookingModel = new booking_1.default();
        const rows = await bookingModel.getAllBookings();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBookings = getAllBookings;
/**
 * READ - Fetch a single booking by ID
 */
const getBookingById = async (req, res) => {
    try {
        const bookingID = Number(req.params.bookingID);
        if (isNaN(bookingID)) {
            res.status(400).json({ error: "Invalid bookingID" });
            return;
        }
        const bookingModel = new booking_1.default();
        const row = await bookingModel.getBookingById(bookingID);
        if (!row) {
            res.status(404).json({ error: "Booking not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res
            .status(500)
            .json({ error: "Failed to retrieve booking", details: message });
    }
};
exports.getBookingById = getBookingById;
/**
 * UPDATE - Edit an existing booking
 */
const updateBooking = async (req, res) => {
    try {
        const bookingID = Number(req.params.bookingID);
        if (isNaN(bookingID)) {
            res.status(400).json({ error: "Invalid bookingID" });
            return;
        }
        const data = req.body;
        const bookingModel = new booking_1.default();
        const result = await bookingModel.updateBooking(bookingID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res
            .status(500)
            .json({ error: "Failed to update booking", details: message });
    }
};
exports.updateBooking = updateBooking;
/**
 * DELETE - Remove a booking by ID
 */
const deleteBooking = async (req, res, next) => {
    try {
        const bookingID = Number(req.params.bookingID);
        if (isNaN(bookingID)) {
            res.status(400).json({ error: "Invalid bookingID" });
            return;
        }
        const bookingModel = new booking_1.default();
        const result = await bookingModel.deleteBooking(bookingID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBooking = deleteBooking;
