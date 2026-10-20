
import { Router } from "express"
import {
    createInstrument,
    getAllInstruments,
    getInstrumentById,
    updateInstrument,
    deleteInstrument
} from "../controllers/instrument"

const router = Router()

router.post("/add", createInstrument)
router.get("/get", getAllInstruments)
router.get("/get/byid/:instrumentID", getInstrumentById)
router.put("/put/:instrumentID", updateInstrument)
router.delete("/delete/:instrumentID", deleteInstrument)

export default router
