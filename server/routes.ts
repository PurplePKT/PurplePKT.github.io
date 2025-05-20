import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve sample data routes for the frontend
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
  });

  // For GitHub Pages deployment, all data will be served statically from /public
  // No backend routes are needed as this is a static website

  const httpServer = createServer(app);

  return httpServer;
}
