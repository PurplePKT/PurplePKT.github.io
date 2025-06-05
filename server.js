// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from dist/public (Vite's build output)
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// Serve CSV files from client/public/data
app.use('/data', express.static(path.join(__dirname, 'client', 'public', 'data')));

// API endpoint to get latest CSV file
app.get('/api/latest-csv', async (req, res) => {
  const csvDir = path.join(__dirname, 'client', 'public', 'data');

  try {
    const files = fs.readdirSync(csvDir)
      .filter(file => file.endsWith('.csv'))
      .map(file => ({
        name: file,
        path: path.join(csvDir, file),
        mtime: fs.statSync(path.join(csvDir, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);

    res.json({ latestFile: files[0].name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});