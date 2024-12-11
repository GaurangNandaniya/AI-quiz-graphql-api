import _ from "lodash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByEmail } from "Controllers/userController";
dotenv.config();

export const validateUser = (req, res, next) => {
  const { userDetails } = req.body;
  const { email, password } = userDetails;
  console.log({ apiRoute: req.originalUrl });

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  next();
};

export const validateUserEmail = (req, res, next) => {
  const { userDetails } = req.body;
  const { email } = userDetails;
  console.log({ apiRoute: req.originalUrl });

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  next();
};

export const authenticateUser = async (req, res, next) => {
  try {
    const token = _.split(_.get(req, "headers.authorization", ""), " ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decoded;
    const user = await getUserByEmail({ email: email });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log(decoded);
    console.log({ apiRoute: req.originalUrl });
    //https://bobbyhadz.com/blog/pass-variables-to-the-next-middleware-in-express-js
    res.locals.jwtUser = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.error("Error in authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
