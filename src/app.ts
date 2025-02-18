import express, { Application } from "express";
import dotenvFlow from "dotenv-flow";
import cors from "cors"; // Import CORS
import { testConnection } from "./repository/database";
import routes from "./routes";

dotenvFlow.config();

// Create express application
const app: Application = express();

/**
 * Starts the Express server
 */
export function startServer() {
  app.use(cors()); // Enable CORS here ✅
  app.use(express.json());

  // Bind the routes to the application
  app.use("/api", routes);

  // Test the connection to the database
  testConnection();

  // Start the server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, function () {
    console.log("Server is up and running on port: " + PORT);
  });
}
