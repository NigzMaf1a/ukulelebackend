"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.readContact = exports.upsertContact = void 0;
const contacts_1 = __importDefault(require("../models/contacts"));
const contacts = new contacts_1.default();
/**
 * Create or replace the contact record
 */
const upsertContact = async (req, res) => {
    const contact = req.body;
    try {
        const result = await contacts.createContact(contact);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to create/update contact', details: message });
    }
};
exports.upsertContact = upsertContact;
/**
 * Read the singleton contact record
 */
const readContact = async (req, res) => {
    try {
        const row = await contacts.readContact();
        if (!row) {
            res.status(404).json({ message: 'No contact record found' });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to fetch contact', details: message });
    }
};
exports.readContact = readContact;
/**
 * Delete the singleton contact record
 */
const deleteContact = async (req, res) => {
    try {
        const result = await contacts.deleteContact();
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No contact record to delete' });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to delete contact', details: message });
    }
};
exports.deleteContact = deleteContact;
