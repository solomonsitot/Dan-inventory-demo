const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Product = require('../models/db.js');
const express = require('express');
const router = express.Router();

router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));
router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '__' + file.originalname);
  },
});

const upload = multer({ storage });

// Insert a new product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { name, category, description, price, amount } = req.body;
    const filename = req.file.filename;

    const data = {
      name: name,
      image: filename,
      category: category,
      description: description,
      price: price,
      amount: amount,
    };

    await Product.create(data);
    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all products
router.get('/get', async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json(allProducts).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product by ID
router.get('/get/:Id', async (req, res) => {
  const id = req.params.Id;
  try {
    const product = await Product.findById(id);
    res.json(product).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/delete/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(204).end();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit a product by ID
router.put('/edit/:Id', upload.single('image'), async (req, res) => {
  const productId = req.params.Id;
  try {
    const { name, description, category, price, amount } = req.body;
    const filename = req.file ? req.file.filename : undefined;

    const result = await Product.findById(productId);

    if (name) result.name = name;
    if (filename) result.image = filename;
    if (description) result.description = description;
    if (category) result.category = category;
    if (price) result.price = price;
    if (amount) result.amount = amount;

    await result.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sell a product by ID
router.put('/sell/:Id', async (req, res) => {
  const productId = req.params.Id;
  try {
    const result = await Product.findById(productId);
    if (result) {
      result.amount -= req.body.sold || 0;
      await result.save();
      res.status(200).json({ message: 'Product sold successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search for products by name
router.get('/search/:search', async (req, res) => {
  const term = req.params.search;
  try {
    const result = await Product.find({ name: { $regex: new RegExp(term, 'i') } });
    res.json(result).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// See products by category
router.get('/see/:productType', async (req, res) => {
  const productType = req.params.productType;
  try {
    const result = await Product.find({ category: { $regex: new RegExp(productType, 'i') } });
    res.json(result).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
