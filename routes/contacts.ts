import express from 'express';
import { upsertContact, deleteContact } from '../controllers/contacts';

const router = express.Router();

router.post('/add', upsertContact);
router.delete('/:ContactID', deleteContact);

export default router;