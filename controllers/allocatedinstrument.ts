
import { Request, Response, RequestHandler } from "express"
import AllocatedInstrumentModel from "../models/allocatedinstrument"
import {
    AllocatedInstrumentPayload,
    AllocatedInstrumentPatch
} from "../interfaces/allocatedinstrument"

export const createAllocatedInstrument = async (
    req: Request,
    res: Response
) => {
    try {
        const payload: AllocatedInstrumentPayload = req.body
        const model = new AllocatedInstrumentModel()
        const result = await model.createAllocatedInstrument(payload)

        res.status(201).json(result)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"

        if (message === "Instrument is unavailable or does not exist") {
            res.status(409).json({ error: message })
            return
        }

        res.status(500).json({
            error: "Failed to create instrument allocation",
            details: message
        })
    }
}

export const getAllAllocatedInstruments: RequestHandler = async (
    _req,
    res,
    next
) => {
    try {
        const model = new AllocatedInstrumentModel()
        const rows = await model.readAllocatedInstruments()

        res.status(200).json(rows)
    } catch (err) {
        next(err)
    }
}

export const getAllocatedInstrumentById = async (
    req: Request,
    res: Response
) => {
    try {
        const allocInstID = Number(req.params.allocInstID)

        if (!Number.isInteger(allocInstID) || allocInstID <= 0) {
            res.status(400).json({ error: "Invalid allocInstID" })
            return
        }

        const model = new AllocatedInstrumentModel()
        const row = await model.getAllocatedInstrumentData(allocInstID)

        if (!row) {
            res.status(404).json({ error: "Instrument allocation not found" })
            return
        }

        res.status(200).json(row)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"

        res.status(500).json({
            error: "Failed to fetch instrument allocation",
            details: message
        })
    }
}

export const patchAllocatedInstrument = async (
    req: Request,
    res: Response
) => {
    try {
        const allocInstID = Number(req.params.allocInstID)

        if (!Number.isInteger(allocInstID) || allocInstID <= 0) {
            res.status(400).json({ error: "Invalid allocInstID" })
            return
        }

        const payload: AllocatedInstrumentPatch = req.body
        const model = new AllocatedInstrumentModel()
        const result = await model.patchAllocatedInstrument(allocInstID, payload)

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Instrument allocation not found" })
            return
        }

        res.status(200).json(result)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"

        res.status(500).json({
            error: "Failed to update instrument allocation",
            details: message
        })
    }
}

export const deleteAllocatedInstrument: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const allocInstID = Number(req.params.allocInstID)

        if (!Number.isInteger(allocInstID) || allocInstID <= 0) {
            res.status(400).json({ error: "Invalid allocInstID" })
            return
        }

        const model = new AllocatedInstrumentModel()
        const result = await model.deleteAllocatedInstrument(allocInstID)

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Instrument allocation not found" })
            return
        }

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
