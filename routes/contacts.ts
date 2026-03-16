import express from 'express';
import { upsertContact, deleteContact, readContact } from '../controllers/contacts';

const router = express.Router();

router.post('/add', upsertContact);
router.delete('/delete/:ContactID', deleteContact);

router.get('/get', readContact);

export default router;