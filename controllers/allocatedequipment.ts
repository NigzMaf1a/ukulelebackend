
import { Request, Response, RequestHandler } from "express"
import AllocatedEquipmentModel from "../models/allocatedequipment"
import {
  AllocatedEquipmentPayload,
  AllocatedEquipmentPatch
} from "../interfaces/allocatedequipment"

export const createAllocatedEquipment = async (
  req: Request,
  res: Response
) => {
  try {
    const payload: AllocatedEquipmentPayload = req.body
    const model = new AllocatedEquipmentModel()
    const result = await model.createAllocatedEquipment(payload)

    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"

    if (message === "Equipment is unavailable or does not exist") {
      res.status(409).json({ error: message })
      return
    }

    res.status(500).json({
      error: "Failed to create equipment allocation",
      details: message
    })
  }
}

export const getAllAllocatedEquipment: RequestHandler = async (
  _req,
  res,
  next
) => {
  try {
    const model = new AllocatedEquipmentModel()
    const rows = await model.readAllocatedEquipment()

    res.status(200).json(rows)
  } catch (err) {
    next(err)
  }
}

export const getAllocatedEquipmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const allocEquipID = Number(req.params.allocEquipID)

    if (!Number.isInteger(allocEquipID) || allocEquipID <= 0) {
      res.status(400).json({ error: "Invalid allocEquipID" })
      return
    }

    const model = new AllocatedEquipmentModel()
    const row = await model.getAllocatedEquipmentData(allocEquipID)

    if (!row) {
      res.status(404).json({ error: "Equipment allocation not found" })
      return
    }

    res.status(200).json(row)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"

    res.status(500).json({
      error: "Failed to fetch equipment allocation",
      details: message
    })
  }
}

export const patchAllocatedEquipment = async (
  req: Request,
  res: Response
) => {
  try {
    const allocEquipID = Number(req.params.allocEquipID)

    if (!Number.isInteger(allocEquipID) || allocEquipID <= 0) {
      res.status(400).json({ error: "Invalid allocEquipID" })
      return
    }

    const payload: AllocatedEquipmentPatch = req.body
    const model = new AllocatedEquipmentModel()
    const result = await model.patchAllocatedEquipment(
      allocEquipID,
      payload
    )

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Equipment allocation not found" })
      return
    }

    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"

    res.status(500).json({
      error: "Failed to update equipment allocation",
      details: message
    })
  }
}

export const deleteAllocatedEquipment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const allocEquipID = Number(req.params.allocEquipID)

    if (!Number.isInteger(allocEquipID) || allocEquipID <= 0) {
      res.status(400).json({ error: "Invalid allocEquipID" })
      return
    }

    const model = new AllocatedEquipmentModel()
    const result = await model.deleteAllocatedEquipment(allocEquipID)

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Equipment allocation not found" })
      return
    }

    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
