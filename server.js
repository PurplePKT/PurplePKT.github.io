import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from client/public (matches your CSV location)
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Endpoint to get the latest CSV file
app.get('/api/latest-csv', async (req, res) => {
  const csvDir = path.join(__dirname, 'client', 'public', 'data'); // Updated path

  try {
    // Read the directory and filter for CSV files
    const files = fs.readdirSync(csvDir)
      .filter(file => file.endsWith('.csv'))
      .map(file => ({
        name: file,
        path: path.join(csvDir, file)
      }));

    if (files.length === 0) {
      return res.status(404).json({ error: 'No CSV files found.' });
    }

    // Get file stats and sort by modified time
    const filesWithStats = files.map(file => {
      const stats = fs.statSync(file.path);
      return {
        ...file,
        mtime: stats.mtime
      };
    });

    // Sort by modified time (newest first)
    filesWithStats.sort((a, b) => b.mtime - a.mtime);

    // Return the most recent file
    res.json({
      latestFile: filesWithStats[0].name,
      files: filesWithStats.map(f => f.name)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
