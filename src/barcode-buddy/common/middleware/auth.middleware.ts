import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const user = verifyJwt(token);
    (req as any).user = user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
