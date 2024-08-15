const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the item schema and model
const itemSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 }, // Assign a unique ID if not provided
  category: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  vendor: { type: String, required: true },
  assignedTo: { type: String, required: true },
  sabreTag: { type: String, required: true },
  additionalFields: { type: mongoose.Schema.Types.Mixed }, // Store dynamic fields here
});

const Item = mongoose.model('Item', itemSchema);


// Define the category schema and model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  fields: { type: [String], default: [] }, // Store fields as an array of strings
});

const Category = mongoose.model('Category', categorySchema);


// Endpoint to add an item
app.post('/add-item', async (req, res) => {
  const { category, newItem } = req.body;

  try {
    // Ensure category exists in MongoDB
    let foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
      foundCategory = new Category({ name: category, fields: Object.keys(newItem) });
      await foundCategory.save();
    } else {
      // Update category fields with any new fields added in this item
      const newFields = Object.keys(newItem).filter(field => !foundCategory.fields.includes(field));
      if (newFields.length > 0) {
        foundCategory.fields.push(...newFields);
        await foundCategory.save();
      }
    }

    // Separate predefined fields and additional fields
    const { brand, model, description, vendor, assignedTo, sabreTag, ...additionalFields } = newItem;

    // Create and save the new item document in MongoDB
    const newItemDocument = new Item({
      brand,
      model,
      description,
      vendor,
      assignedTo,
      sabreTag,
      category,
      additionalFields, // Save dynamic fields here
    });

    await newItemDocument.save();

    // Save the new item to db.json
    const dbPath = 'db.json';
    let db = {};
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      db = JSON.parse(data);
    }

    // Ensure category exists in db.json
    if (!db[category]) {
      db[category] = [];
    }

    // Add the new item to the category in db.json
    db[category].push(newItemDocument);

    // Write the updated db back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(200).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Endpoint to fetch data from db.json
app.get('/db-json', (req, res) => {
  const dbPath = 'db.json';
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(404).json({ message: 'db.json file not found' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
