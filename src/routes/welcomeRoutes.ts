import express from "express";
import welcome from "../controllers/welcomeController.ts";
import auth from "../middleware/auth.ts";
const router = express.Router();

router.post("/welcome", auth, welcome);

export default router;
