
import type { Request, Response, RequestHandler } from "express"
import FinanceModel from "../models/finance"
import type { FinancePayload } from "../interfaces/finance"

export const createFinance = async (req: Request, res: Response) => {
  try {
    const payload: FinancePayload = req.body
    const financeModel = new FinanceModel()
    const result = await financeModel.createFinance(payload)

    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    res.status(500).json({
      error: "Failed to create finance record",
      details: message
    })
  }
}

export const getAllFinance: RequestHandler = async (_req, res, next) => {
  try {
    const financeModel = new FinanceModel()
    const rows = await financeModel.readFinance()

    res.status(200).json(rows)
  } catch (err) {
    next(err)
  }
}

export const getFinanceById = async (req: Request, res: Response) => {
  try {
    const transactionID = Number(req.params.transactionID)

    if (!Number.isInteger(transactionID)) {
      res.status(400).json({ error: "Invalid transactionID" })
      return
    }

    const financeModel = new FinanceModel()
    const row = await financeModel.getFinanceData(transactionID)

    if (!row) {
      res.status(404).json({ error: "Finance record not found" })
      return
    }

    res.status(200).json(row)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"

    res.status(500).json({
      error: "Failed to fetch finance record",
      details: message
    })
  }
}

export const updateFinance = async (req: Request, res: Response) => {
  try {
    const transactionID = Number(req.params.transactionID)

    if (!Number.isInteger(transactionID)) {
      res.status(400).json({ error: "Invalid transactionID" })
      return
    }

    const financeModel = new FinanceModel()
    const result = await financeModel.updateFinance(transactionID)

    if (result.affectedRows === 0) {
      res.status(404).json(result)
      return
    }

    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"

    res.status(500).json({
      error: "Failed to approve payment",
      details: message
    })
  }
}

export const deleteFinance: RequestHandler = async (req, res, next) => {
  try {
    const transactionID = Number(req.params.transactionID)

    if (!Number.isInteger(transactionID)) {
      res.status(400).json({ error: "Invalid transactionID" })
      return
    }

    const financeModel = new FinanceModel()
    const result = await financeModel.deleteFinance(transactionID)

    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
