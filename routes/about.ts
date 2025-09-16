import { Router } from "express";
import {
  createAbout,
  getAllAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/about";

const router = Router();

router.post("/add", createAbout);
router.get("/get", getAllAbout);
router.get("/single", getAbout);
router.put("/", updateAbout);
router.delete("/", deleteAbout);

export default router;
