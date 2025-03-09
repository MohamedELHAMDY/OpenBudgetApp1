import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Budget routes
  app.get("/api/budget", async (req, res) => {
    const items = await storage.getBudgetItems();
    res.json(items);
  });

  // Forum routes
  app.get("/api/forum", async (req, res) => {
    const posts = await storage.getForumPosts();
    res.json(posts);
  });

  app.post("/api/forum", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await storage.createForumPost({
      ...req.body,
      userId: req.user!.id
    });
    res.status(201).json(post);
  });

  // Survey routes
  app.get("/api/surveys", async (req, res) => {
    const surveys = await storage.getSurveys();
    res.json(surveys);
  });

  app.post("/api/surveys", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const survey = await storage.createSurvey(req.body);
    res.status(201).json(survey);
  });

  const httpServer = createServer(app);
  return httpServer;
}
