import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_SECRET = "dev_secret";

export function signJwt(
  payload: string | object | Buffer,
  expiresIn: string | number = "1h",
) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(
    payload,
    JWT_SECRET as jwt.Secret,
    { expiresIn } as jwt.SignOptions,
  );
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET as string);
}
