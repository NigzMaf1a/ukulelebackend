import { Router } from "express";
import {
    createFeedback,
    readFeedback,
    updateFeedback,
    deleteFeedback
} from '../controllers/feedback';

const router = Router();

router.post('/add', createFeedback);
router.get('/get', readFeedback);
router.put('/put', updateFeedback);
router.delete('/delete', deleteFeedback);

export default router;
