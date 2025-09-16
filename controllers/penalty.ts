// controllers/penalty.ts
import { Request, Response, RequestHandler } from "express";
import PenaltyModel from "../models/penalty";
import { PenaltyPayload } from "../interfaces/penalty";

/**
 * CREATE - Add a new penalty
 */
export const createPenalty = async (req: Request, res: Response) => {
  try {
    const data: PenaltyPayload = req.body;
    const penaltyModel = new PenaltyModel();
    const result = await penaltyModel.createPenalty(data);

    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create penalty", details: message });
  }
};

/**
 * READ - Get all penalties
 */
export const getAllPenalties: RequestHandler = async (_req, res, next) => {
  try {
    const penaltyModel = new PenaltyModel();
    const rows = await penaltyModel.readPenalties();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single penalty by ID
 */
export const getPenaltyById = async (req: Request, res: Response) => {
  try {
    const penaltyID = Number(req.params.penaltyID);
    if (isNaN(penaltyID)) {
      res.status(400).json({ error: "Invalid penaltyID" });
      return;
    }

    const penaltyModel = new PenaltyModel();
    const row = await penaltyModel.getPenaltyData(penaltyID);

    if (!row) {
      res.status(404).json({ error: "Penalty not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch penalty", details: message });
  }
};

/**
 * UPDATE - Update a penalty record
 */
export const updatePenalty = async (req: Request, res: Response) => {
  try {
    const penaltyID = Number(req.params.penaltyID);
    if (isNaN(penaltyID)) {
      res.status(400).json({ error: "Invalid penaltyID" });
      return;
    }

    const data: PenaltyPayload = req.body;
    const penaltyModel = new PenaltyModel();
    const result = await penaltyModel.updatePenalty(penaltyID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update penalty", details: message });
  }
};

/**
 * DELETE - Remove a penalty record
 */
export const deletePenalty: RequestHandler = async (req, res, next) => {
  try {
    const penaltyID = Number(req.params.penaltyID);
    if (isNaN(penaltyID)) {
      res.status(400).json({ error: "Invalid penaltyID" });
      return;
    }

    const penaltyModel = new PenaltyModel();
    const result = await penaltyModel.deletePenalty(penaltyID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
