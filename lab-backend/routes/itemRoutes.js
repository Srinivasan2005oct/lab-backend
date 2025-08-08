const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: 'Error creating item', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    }catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const  updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        req.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error updating item', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting item', error: err.message });
    }
});
module.exports = router;