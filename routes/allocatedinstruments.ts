
import { Router } from "express"
import {
    createAllocatedInstrument,
    getAllAllocatedInstruments,
    getAllocatedInstrumentById,
    patchAllocatedInstrument,
    deleteAllocatedInstrument
} from "../controllers/allocatedinstrument"

const router = Router()

router.post("/add", createAllocatedInstrument)
router.get("/get", getAllAllocatedInstruments)
router.get("/get/byid/:allocInstID", getAllocatedInstrumentById)
router.patch("/patch/:allocInstID", patchAllocatedInstrument)
router.delete("/delete/:allocInstID", deleteAllocatedInstrument)

export default router