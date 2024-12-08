import express from "express";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { generateToken } from "Utils/jwtUtils";
import {
  createNewUser,
  getUserByEmail,
  getUserByAuthProvider,
} from "Controllers/userController";
import { GOOGLE } from "Constants/ThirdPartyPlatforms";
import { validateUser, validateUserEmail } from "Middleware/authMiddleware";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const client = new OAuth2Client();

router.post("/signup", validateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { email, password, firstName, lastName } = userDetails;
    const user = await getUserByEmail({ email });

    if (!_.isEmpty(user)) {
      return res.json({ success: false, message: "User already exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const createdUser = await createNewUser(newUser);

    const loginToken = generateToken({
      email,
      userId: createdUser?.id,
      firstName: newUser?.firstName,
      lastName: newUser?.lastName,
    });

    res.json({
      success: true,
      token: loginToken,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/thirdPartyAuth", async (req, res) => {
  try {
    const { authProvider, authProviderMetadata } = req.body;

    switch (authProvider) {
      case GOOGLE: {
        const { token } = authProviderMetadata;
        //google auth
        //https://developers.google.com/identity/sign-in/web/backend-auth#node.js
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_LOGIN_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload["email"];
        const firstName = payload["given_name"];
        const lastName = payload["family_name"];
        const providerId = payload["sub"];

        const user = await getUserByEmail({ email });

        if (!_.isEmpty(user)) {
          return res.json({ success: false, message: "User already exist!" });
        }
        const newUser = {
          email,
          firstName,
          lastName,
          authProvider: GOOGLE,
          providerId,
        };

        const createdUser = await createNewUser(newUser);

        const loginToken = generateToken({
          email,
          userId: createdUser?.id,
          firstName: newUser?.firstName,
          lastName: newUser?.lastName,
        });

        res.json({
          success: true,
          token: loginToken,
          message: "User registered successfully",
        });
        break;
      }
      default:
        throw new Error("Invalid platform type");
    }
  } catch (error) {
    console.error("Error during third party sign-up:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/login", validateUserEmail, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { email, password, authProvider, authProviderMetadata } = userDetails;
    let user;

    switch (authProvider) {
      case GOOGLE:
        {
          const { token } = authProviderMetadata;
          //google auth
          //https://developers.google.com/identity/sign-in/web/backend-auth#node.js
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_LOGIN_CLIENT_ID,
          });
          const payload = ticket.getPayload();
          const providerId = payload["sub"];

          user = await getUserByAuthProvider({
            authProvider,
            providerId,
          });

          if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
        }
        break;
      default:
        {
          //normal email password auth
          user = await getUserByEmail({ email });

          if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
        }
        break;
    }

    const loginToken = generateToken({
      email,
      userId: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    res.json({ success: true, token: loginToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
