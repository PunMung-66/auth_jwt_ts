import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.ts";
import type { Request, Response } from "express";
import type { UserType } from "../types/usertype.ts";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstname, lastname, email, password }: UserType = req.body;
    if (!firstname || !lastname || !email || !password) {
      res.status(400).send("All input is required");
      return;
    }
    const oldUser = await User.findOne({ email: email.toLowerCase() });
    if (oldUser) {
      res.status(409).send("User already exist.");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    const responseUser: UserType = user.toObject();
    responseUser.token = token;
    res.status(201).json(responseUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("All input is required");
      return;
    }
    const userCurrent = await User.findOne({ email: email.toLowerCase() });
    if (!userCurrent) {
      res.status(404).send("User not found.");
      return;
    }
    const isMatch = await bcrypt.compare(password, userCurrent.password);
    if (!isMatch) {
      res.status(400).send("Invalid Credentials");
      return;
    }
    const token = jwt.sign(
      { user_id: userCurrent._id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "1m",
      }
    );
    const responseUser: UserType = userCurrent.toObject();
    responseUser.token = token;
    res.status(200).json(responseUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req.user as any) || null;

    if (!user) {
      res.status(401).send("Authentication failed");
      return;
    }

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );

    const responseUser: UserType = user.toObject();
    responseUser.token = token;

    res.status(200).json(responseUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
