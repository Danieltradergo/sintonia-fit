import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateDailyPlan, generateFallbackPlan } from "./gemini";
import { recipeRouter } from "./recipeRoutes";

export async function registerRoutes(app: Express): Promise<Server> {
  // ETAPA 1: Autenticacion - Signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if user exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await storage.hashPassword(password);

      // Create user
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        name,
      });

      (req.session as any).userId = user.id;

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Signup failed" });
    }
  });

  // ETAPA 1: Autenticacion - Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const isValidPassword = await storage.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      (req.session as any).userId = user.id;

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // ETAPA 1: Autenticacion - Session check
  app.get("/api/auth/session", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUserById(userId);
      if (!user) {
        return res.status(401).json({ error: "Session check failed" });
      }

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error) {
      console.error("Session error:", error);
      res.status(500).json({ error: "Session check failed" });
    }
  });

  // ETAPA 1: Autenticacion - Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out" });
    });
  });

  // ETAPA 2: Historico de Planos
  app.get("/api/plan-history", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const history = localStorage.getItem(`sintonia_plan_history_${userId}`) || "[]";
      res.json(JSON.parse(history));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  // ETAPA 3: Generate daily plan
  app.post("/api/generate-plan", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { profile } = req.body;
      if (!profile) {
        return res.status(400).json({ error: "Missing profile" });
      }

      let plan;
      try {
        plan = await generateDailyPlan(profile);
      } catch (aiError) {
        console.error("Gemini AI error, using fallback plan:", aiError);
        plan = generateFallbackPlan(profile);
      }

      res.json(plan);
    } catch (error) {
      console.error("Error generating plan:", error);
      res.status(500).json({
        error: "Failed to generate plan",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // ETAPA 6: Metas & Challenges
  app.get("/api/goals", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const goals = [
        {
          id: "goal1",
          title: "Completar 15 ejercicios esta semana",
          progress: 8,
          target: 15,
        },
        {
          id: "goal2",
          title: "Beber 2L de agua diariamente",
          progress: 1.5,
          target: 2,
        },
        {
          id: "goal3",
          title: "Aumentar 100g de proteína",
          progress: 75,
          target: 100,
        },
      ];
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  // Register recipe routes - THIS IS THE FIX: routes inside the function
  app.use("/api/recipes", recipeRouter);

  // Create and return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
