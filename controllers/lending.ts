// controllers/lending.ts
import { Request, Response, RequestHandler } from "express";
import LendingModel from "../models/lending";
import { LendingPayload } from "../interfaces/services";

/**
 * CREATE - Add a new lending record
 */
export const createLending = async (req: Request, res: Response) => {
  try {
    const payload: LendingPayload = req.body;
    const lendingModel = new LendingModel();
    const result = await lendingModel.createLending(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create lending record", details: message });
  }
};

/**
 * READ - Get all lending records
 */
export const getAllLending: RequestHandler = async (_req, res, next) => {
  try {
    const lendingModel = new LendingModel();
    const rows = await lendingModel.getAllLending();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single lending record by ID
 */
export const getLendingById = async (req: Request, res: Response) => {
  try {
    const lendID = Number(req.params.lendID);
    if (isNaN(lendID)) {
      res.status(400).json({ error: "Invalid lendID" });
      return;
    }

    const lendingModel = new LendingModel();
    const row = await lendingModel.getLendingById(lendID);

    if (!row) {
      res.status(404).json({ error: "Lending record not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch lending record", details: message });
  }
};

/**
 * UPDATE - Edit an existing lending record
 */
export const updateLending = async (req: Request, res: Response) => {
  try {
    const lendID = Number(req.params.lendID);
    if (isNaN(lendID)) {
      res.status(400).json({ error: "Invalid lendID" });
      return;
    }

    const data: Partial<LendingPayload> = req.body;
    const lendingModel = new LendingModel();
    const result = await lendingModel.updateLending(lendID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update lending record", details: message });
  }
};

/**
 * DELETE - Remove a lending record
 */
export const deleteLending: RequestHandler = async (req, res, next) => {
  try {
    const lendID = Number(req.params.lendID);
    if (isNaN(lendID)) {
      res.status(400).json({ error: "Invalid lendID" });
      return;
    }

    const lendingModel = new LendingModel();
    const result = await lendingModel.deleteLending(lendID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
