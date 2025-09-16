import { Router } from "express";
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/member";

const router = Router();

router.post("/add", createMember);
router.get("/get", getAllMembers);
router.get("/:memberID", getMemberById);
router.put("/:memberID", updateMember);
router.delete("/:memberID", deleteMember);

export default router;
