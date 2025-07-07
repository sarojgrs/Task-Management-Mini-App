import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

export async function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(bodyParser.json());

  /* logs */
  app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
  });

  /* api Routes */
  app.use("/api/", routes);

  return app;
}
