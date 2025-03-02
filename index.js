
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes for service pages
app.get('/residential.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'residential.html'));
});

app.get('/commercial.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'commercial.html'));
});

app.get('/industrial.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'industrial.html'));
});

// API route to get electrical company data
app.get('/api/companies', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'attached_assets/bamaelectric.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Failed to read company data' });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
