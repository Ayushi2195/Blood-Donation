import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
