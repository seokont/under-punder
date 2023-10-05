import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../../models/Users";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { checkAuthorization } from "../../../src/middleware/hasPermission";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      nickname,
      first_name,
      second_name,
      last_name,
      phone,
      photo,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      id: uuidv4(),
      role_id: uuidv4(),
      sub_role: uuidv4(),
      email,
      nickname,
      first_name,
      second_name,
      last_name,
      phone,
      photo,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user.id }, "secret_key");
    res.status(200).json({
      id: user.id,
      token,
      email,
      nickname: user.nickname,
      first_name: user.first_name,
      second_name: user.second_name,
      last_name: user.last_name,
      phone: user.phone,
      photo: user.photo,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

authRouter.get("/allusers", checkAuthorization, async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({users: users.map(l => l.details)});
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});
