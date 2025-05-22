import { AppDataSource } from "../../config/database";
import { User } from "../models/user.model";

// Find user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const userRepo = AppDataSource.getRepository(User);
  return userRepo.findOne({ where: { email } });
}

// Create a new user
export async function createUser(data: Partial<User>): Promise<User> {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(data);
  return userRepo.save(user);
}
