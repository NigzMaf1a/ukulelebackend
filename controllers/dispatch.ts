// controllers/dispatch.ts
import { Request, Response, RequestHandler } from "express";
import DispatchModel from "../models/dispatch";
import { DispatchPayload } from "../interfaces/dispatch";

/**
 * CREATE - Add a new dispatch
 */
export const createDispatch = async (req: Request, res: Response) => {
  try {
    const payload: DispatchPayload = req.body;
    const dispatchModel = new DispatchModel();
    const result = await dispatchModel.createDispatch(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create dispatch", details: message });
  }
};

/**
 * READ - Get all dispatches
 */
export const getAllDispatches: RequestHandler = async (_req, res, next) => {
  try {
    const dispatchModel = new DispatchModel();
    const rows = await dispatchModel.getAllDispatches();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single dispatch by ID
 */
export const getDispatchById = async (req: Request, res: Response) => {
  try {
    const dispatchID = Number(req.params.dispatchID);
    if (isNaN(dispatchID)) {
      res.status(400).json({ error: "Invalid dispatchID" });
      return;
    }

    const dispatchModel = new DispatchModel();
    const row = await dispatchModel.getDispatchById(dispatchID);

    if (!row) {
      res.status(404).json({ error: "Dispatch not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch dispatch", details: message });
  }
};

/**
 * UPDATE - Edit an existing dispatch
 */
export const updateDispatch = async (req: Request, res: Response) => {
  try {
    const dispatchID = Number(req.params.dispatchID);
    if (isNaN(dispatchID)) {
      res.status(400).json({ error: "Invalid dispatchID" });
      return;
    }

    const data: Partial<DispatchPayload> = req.body;
    const dispatchModel = new DispatchModel();
    const result = await dispatchModel.updateDispatch(dispatchID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update dispatch", details: message });
  }
};

/**
 * DELETE - Remove a dispatch record
 */
export const deleteDispatch: RequestHandler = async (req, res, next) => {
  try {
    const dispatchID = Number(req.params.dispatchID);
    if (isNaN(dispatchID)) {
      res.status(400).json({ error: "Invalid dispatchID" });
      return;
    }

    const dispatchModel = new DispatchModel();
    const result = await dispatchModel.deleteDispatch(dispatchID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
