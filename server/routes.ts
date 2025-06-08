import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from 'fs/promises';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
  });

  // New endpoint to get latest CSV files
  app.get('/api/latest-csv', async (req, res) => {
    try {
      const dataDir = path.join(__dirname, 'public', 'data');
      const files = await fs.readdir(dataDir);

      // Find latest routes and solicitations CSVs
      const csvFiles = files.filter(file => 
        file.startsWith('Routes_') || file.startsWith('Solicitations_')
      ).sort().reverse();

      const latestFiles = {
        routes: csvFiles.find(f => f.startsWith('Routes_')),
        solicitations: csvFiles.find(f => f.startsWith('Solicitations_'))
      };

      res.json(latestFiles);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to fetch CSV files',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
