import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import SessionRoutes from "./routes/session.routes";
import AuthRoutes from "./routes/auth.routes";
import * as AuthMiddleware from "./middleware/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Dev Session Backend Running",
  });
});

app.use("/sessions", AuthMiddleware.authenticateToken, SessionRoutes);
app.use("/auth", AuthRoutes);

export default app;
