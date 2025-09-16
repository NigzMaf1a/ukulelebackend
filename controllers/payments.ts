// controllers/payments.ts
import { Request, Response, RequestHandler } from "express";
import PaymentModel from "../models/payment";
import { PaymentPayload } from "../interfaces/payment";

/**
 * CREATE - Add a new payment
 */
export const createPayment = async (req: Request, res: Response) => {
  try {
    const data: PaymentPayload = req.body;
    const paymentModel = new PaymentModel();
    const result = await paymentModel.createPayment(data);

    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create payment", details: message });
  }
};

/**
 * READ - Get all payments
 */
export const getAllPayments: RequestHandler = async (_req, res, next) => {
  try {
    const paymentModel = new PaymentModel();
    const rows = await paymentModel.readPayments();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single payment by ID
 */
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const processID = Number(req.params.processID);
    if (isNaN(processID)) {
      res.status(400).json({ error: "Invalid processID" });
      return;
    }

    const paymentModel = new PaymentModel();
    const row = await paymentModel.getPaymentData(processID);

    if (!row) {
      res.status(404).json({ error: "Payment not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch payment", details: message });
  }
};

/**
 * UPDATE - Update a payment record
 */
export const updatePayment = async (req: Request, res: Response) => {
  try {
    const processID = Number(req.params.processID);
    if (isNaN(processID)) {
      res.status(400).json({ error: "Invalid processID" });
      return;
    }

    const data: PaymentPayload = req.body;
    const paymentModel = new PaymentModel();
    const result = await paymentModel.updatePayment(processID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update payment", details: message });
  }
};

/**
 * DELETE - Remove a payment record
 */
export const deletePayment: RequestHandler = async (req, res, next) => {
  try {
    const processID = Number(req.params.processID);
    if (isNaN(processID)) {
      res.status(400).json({ error: "Invalid processID" });
      return;
    }

    const paymentModel = new PaymentModel();
    const result = await paymentModel.deletePayment(processID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
