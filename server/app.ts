import { type Server } from "node:http";
import express, {
  type Express,
  type Request,
  type Response,
  NextFunction,
} from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import { registerRoutes } from "./routes";

declare global {
  namespace Express {
    interface Request {
      session: any;
    }
  }
}

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime}[${source}]${message}`);
}

export const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ extended: false }));

// Session middleware - Using MemoryStore for development/MVP
const memoryStore = new (MemoryStore(session))();
app.use(
  session({
    store: memoryStore,
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
