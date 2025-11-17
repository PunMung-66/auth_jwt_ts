import express from "express";
import cors from "cors";
import authRouters from "./routes/authRoutes.ts";
import welcomeRouters from "./routes/welcomeRoutes.ts";
import { connect } from "./config/database.ts";
import passport from "./config/passport.ts";
import session from "express-session";

await connect();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Configure session middleware (required for passport's login sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());
app.use(passport.initialize());

app.use("/api/auth", authRouters);
app.use("/api/", welcomeRouters);

export default app;
