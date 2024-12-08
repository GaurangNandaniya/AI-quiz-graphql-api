import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config(); // Load environment variables from .env file

// Generate JWT token with 1 year expiration
export const generateToken = ({ email, userId, firstName, lastName }) => {
  return jwt.sign(
    { email, userId, firstName, lastName },
    process.env.SECRET_KEY,
    {
      expiresIn: "1y",
    }
  );
};
