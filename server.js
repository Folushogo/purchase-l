const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/add-item', (req, res) => {
  const { category, newItem } = req.body;
  const data = fs.readFileSync('db.json', 'utf8');
  const db = JSON.parse(data);

  // Check if the category exists
  if (!db[category]) {
    return res.status(400).json({ message: 'Category does not exist' });
  }

  // Assign a unique ID to the new item if it doesn't have one
  if (!newItem.id) {
    newItem.id = uuidv4();
  }

  // Add the new item to the category
  db[category].unshift(newItem);

  // Write the updated db back to db.json
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  res.status(200).json({ message: 'Item added successfully' });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
