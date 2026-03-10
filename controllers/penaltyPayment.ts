import { Request, Response, RequestHandler } from "express";
import PenaltyPayment from "../models/penaltyPayment";
import { PenaltyPaymentPayload } from "../interfaces/penaltyPayment";


// CREATE
export const createPenaltyPayment = async (req: Request, res: Response) => {
  try {

    const payload: PenaltyPaymentPayload = req.body;

    const penaltyPayment = new PenaltyPayment();
    const result = await penaltyPayment.createPenaltyPayment(payload);

    res.status(201).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to create penalty payment",
      details: message
    });

  }
};


// READ ALL
export const readPenaltyPayment: RequestHandler = async (_req, res, next) => {
  try {

    const penaltyPayment = new PenaltyPayment();
    const rows = await penaltyPayment.readPenaltyPayment();

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }
};


// READ SINGLE
export const getPenaltyPaymentData = async (req: Request, res: Response) => {

  const id = Number(req.params.penaltyPaymentID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid penaltyPaymentID" });
    return;
  }

  try {

    const penaltyPayment = new PenaltyPayment();
    const row = await penaltyPayment.getPenaltyPaymentData(id);

    if (!row) {
      res.status(404).json({ error: "Penalty payment not found" });
      return;
    }

    res.status(200).json(row);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to fetch penalty payment",
      details: message
    });

  }
};


// UPDATE
export const updatePenaltyPayment = async (req: Request, res: Response) => {

  const id = Number(req.params.penaltyPaymentID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid penaltyPaymentID" });
    return;
  }

  try {

    const payload: PenaltyPaymentPayload = req.body;

    const penaltyPayment = new PenaltyPayment();
    const result = await penaltyPayment.updatePenaltyPayment(id, payload);

    res.status(200).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to update penalty payment",
      details: message
    });

  }
};


// DELETE
export const deletePenaltyPayment: RequestHandler = async (req, res, next) => {

  const id = Number(req.params.penaltyPaymentID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid penaltyPaymentID" });
    return;
  }

  try {

    const penaltyPayment = new PenaltyPayment();
    const result = await penaltyPayment.deletePenaltyPayment(id);

    res.status(200).json(result);

  } catch (err) {
    next(err);
  }
};