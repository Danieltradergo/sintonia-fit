import { app } from "./app";
import { registerRoutes } from "./routes";

async function startServer() {
  const httpServer = await registerRoutes(app);
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

export default app;
