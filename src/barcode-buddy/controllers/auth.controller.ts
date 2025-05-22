import { Request, Response } from "express";
import { signJwt } from "../common/utils/jwt";
import { getUserByEmail, createUser } from "../services/user.service";
import { comparePassword, hashPassword } from "../common/utils/password";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = signJwt({ id: user.id, email: user.email });
  res.json({ token });
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName, roleId } = req.body;
  if (!email || !password || !firstName) {
    return res
      .status(400)
      .json({ error: "email, password, and firstName are required" });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashed = await hashPassword(password);
  const user = await createUser({
    email,
    password: hashed,
    firstName,
    lastName,
    roleId,
  });
  res.status(201).json({ id: user.id, email: user.email });
}

export async function logout(req: Request, res: Response) {
  res.json({ message: "Logged out" });
}
