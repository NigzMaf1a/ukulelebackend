// controllers/feedbackController.ts
import { Request, Response, RequestHandler } from "express";
import Feedback from "../models/feedback";
import { FeedbackPayload } from "../interfaces/feedback";

/**
 * CREATE - Add a new feedback record
 */
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const payload: FeedbackPayload = req.body;
    const feedback = new Feedback();
    const result = await feedback.createFeedback(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create feedback", details: message });
  }
};

/**
 * READ - Get all feedback records
 */
export const readFeedback: RequestHandler = async (_req, res, next) => {
  try {
    const feedback = new Feedback();
    const rows = await feedback.readFeedback();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * GET - Single feedback record by ID
 */
export const getFeedbackData = async (req: Request, res: Response) => {
  const id = Number(req.params.feedbackID);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid feedbackID" });
    return;
  }

  try {
    const feedback = new Feedback();
    const row = await feedback.getFeedbackData(id);

    if (!row) {
      res.status(404).json({ error: "Feedback not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch feedback", details: message });
  }
};

/**
 * UPDATE - Edit a feedback record
 */
export const updateFeedback = async (req: Request, res: Response) => {
  const id = Number(req.params.feedbackID);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid feedbackID" });
    return;
  }

  try {
    const payload: FeedbackPayload = req.body;
    const feedback = new Feedback();
    const result = await feedback.updateFeedback(id, payload);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update feedback", details: message });
  }
};

/**
 * DELETE - Remove a feedback record
 */
export const deleteFeedback: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.feedbackID);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid feedbackID" });
    return;
  }

  try {
    const feedback = new Feedback();
    const result = await feedback.deleteFeedback(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
