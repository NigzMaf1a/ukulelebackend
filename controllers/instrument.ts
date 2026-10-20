
import { Request, Response, RequestHandler } from "express"
import InstrumentModel from "../models/instruments"
import { InstrumentPayload } from "../interfaces/instrument"

export const createInstrument = async (req: Request, res: Response) => {
    try {
        const payload: InstrumentPayload = req.body
        const instrumentModel = new InstrumentModel()
        const result = await instrumentModel.createInstrument(payload)

        res.status(201).json(result)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        res.status(500).json({
            error: "Failed to create instrument",
            details: message
        })
    }
}

export const getAllInstruments: RequestHandler = async (_req, res, next) => {
    try {
        const instrumentModel = new InstrumentModel()
        const rows = await instrumentModel.readInstruments()

        res.status(200).json(rows)
    } catch (err) {
        next(err)
    }
}

export const getInstrumentById = async (req: Request, res: Response) => {
    try {
        const instrumentID = Number(req.params.instrumentID)

        if (!Number.isInteger(instrumentID) || instrumentID <= 0) {
            res.status(400).json({ error: "Invalid instrumentID" })
            return
        }

        const instrumentModel = new InstrumentModel()
        const row = await instrumentModel.getInstrumentData(instrumentID)

        if (!row) {
            res.status(404).json({ error: "Instrument record not found" })
            return
        }

        res.status(200).json(row)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        res.status(500).json({
            error: "Failed to fetch instrument record",
            details: message
        })
    }
}

export const updateInstrument = async (req: Request, res: Response) => {
    try {
        const instrumentID = Number(req.params.instrumentID)

        if (!Number.isInteger(instrumentID) || instrumentID <= 0) {
            res.status(400).json({ error: "Invalid instrumentID" })
            return
        }

        const data: InstrumentPayload = req.body
        const instrumentModel = new InstrumentModel()
        const result = await instrumentModel.updateInstrument(instrumentID, data)

        res.status(200).json(result)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        res.status(500).json({
            error: "Failed to update instrument",
            details: message
        })
    }
}

export const deleteInstrument: RequestHandler = async (_req, res, next) => {
    try {
        const instrumentID = Number(_req.params.instrumentID)

        if (!Number.isInteger(instrumentID) || instrumentID <= 0) {
            res.status(400).json({ error: "Invalid instrumentID" })
            return
        }

        const instrumentModel = new InstrumentModel()
        const result = await instrumentModel.deleteInstrument(instrumentID)

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
