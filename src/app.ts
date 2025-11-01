import express from "express";
import authRouters from "./routes/authRoutes.ts";
import welcomeRouters from "./routes/welcomeRoutes.ts";
import { connect } from "./config/database.ts";

await connect();

const app = express();

app.use(express.json());

app.use("/api/auth", authRouters);
app.use("/api/", welcomeRouters);

export default app;
