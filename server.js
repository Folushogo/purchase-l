app.post('/categories', async (req, res) => {
  const { name, fields } = req.body;

  try {
    // Fetch all categories
    const categories = await db.categories.find({});
    // Check if the category already exists
    const existingCategory = categories.find(cat => cat.name === name);

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = {
      name,
      fields: [...new Set(fields)] // Remove duplicate fields
    };

    await db.categories.insert(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new category' });
  }
});
