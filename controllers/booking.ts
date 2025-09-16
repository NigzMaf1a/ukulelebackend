// controllers/booking.ts
import { Request, Response, RequestHandler } from "express";
import BookingModel from "../models/booking";
import { BookingPayload } from "../interfaces/services";

/**
 * CREATE - Add a new booking
 */
export const createBooking = async (req: Request, res: Response) => {
  try {
    const payload: BookingPayload = req.body;
    const bookingModel = new BookingModel();
    const result = await bookingModel.createBooking(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Failed to create booking", details: message });
  }
};

/**
 * READ - Fetch all bookings
 */
export const getAllBookings: RequestHandler = async (_req, res, next) => {
  try {
    const bookingModel = new BookingModel();
    const rows = await bookingModel.getAllBookings();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Fetch a single booking by ID
 */
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingID = Number(req.params.bookingID);
    if (isNaN(bookingID)) {
      res.status(400).json({ error: "Invalid bookingID" });
      return;
    }

    const bookingModel = new BookingModel();
    const row = await bookingModel.getBookingById(bookingID);

    if (!row) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Failed to retrieve booking", details: message });
  }
};

/**
 * UPDATE - Edit an existing booking
 */
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingID = Number(req.params.bookingID);
    if (isNaN(bookingID)) {
      res.status(400).json({ error: "Invalid bookingID" });
      return;
    }

    const data: Partial<BookingPayload> = req.body;
    const bookingModel = new BookingModel();
    const result = await bookingModel.updateBooking(bookingID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Failed to update booking", details: message });
  }
};

/**
 * DELETE - Remove a booking by ID
 */
export const deleteBooking: RequestHandler = async (req, res, next) => {
  try {
    const bookingID = Number(req.params.bookingID);
    if (isNaN(bookingID)) {
      res.status(400).json({ error: "Invalid bookingID" });
      return;
    }

    const bookingModel = new BookingModel();
    const result = await bookingModel.deleteBooking(bookingID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
