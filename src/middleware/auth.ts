import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token =
    req.body?.token || req.query?.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication.");
  }

  try {
    const secret = process.env.TOKEN_KEY;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token.");
  }

  return next();
};

export default verifyToken;
