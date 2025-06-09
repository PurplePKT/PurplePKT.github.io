//Server.js
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

// Helper function to get latest CSV for a given prefix
function getLatestCsvFile(prefix) {
  const csvDir = path.join(__dirname, 'client', 'public', 'data');
  const files = fs.readdirSync(csvDir)
    .filter(file => file.startsWith(prefix) && file.endsWith('.csv'))
    .map(file => ({
      name: file,
      mtime: fs.statSync(path.join(csvDir, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);
  return files[0]?.name || null;
}

// Endpoint for latest Routes CSV
app.get('/api/latest-routes-csv', (req, res) => {
  const latestFile = getLatestCsvFile('Routes_');
  if (!latestFile) {
    return res.status(404).json({ error: 'No routes CSV found' });
  }
  res.json({ latestFile });
});

// Endpoint for latest Solicitations CSV
app.get('/api/latest-solicitations-csv', (req, res) => {
  const latestFile = getLatestCsvFile('Solicitations_');
  if (!latestFile) {
    return res.status(404).json({ error: 'No solicitations CSV found' });
  }
  res.json({ latestFile });
});

// (Optional) Old endpoint for backwards compatibility
app.get('/api/latest-csv', (req, res) => {
  const latestRoutes = getLatestCsvFile('Routes_');
  const latestSolicitations = getLatestCsvFile('Solicitations_');
  res.json({
    routes: latestRoutes || 'Not found',
    solicitations: latestSolicitations || 'Not found'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});