import express, { Application, Request, Response } from "express";
import dotenvFlow from "dotenv-flow";
import routes from "./routes";

dotenvFlow.config();

// Create Express application
const app: Application = express();

// Routes
app.use("/api", routes);

// Middleware
export function startServer() {
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  // Start server
  app.listen(PORT, function () {
    console.log("Server is up and running on port " + PORT);
  });
}
