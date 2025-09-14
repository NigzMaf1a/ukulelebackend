import express from 'express';
import { createContact, readContacts, updateContact, deleteContact } from '../controllers/contacts';

const router = express.Router();

router.post('/add', createContact);
router.get('/get', readContacts);
router.put('/:ContactID', updateContact);
router.delete('/:ContactID', deleteContact);

export default router;