import express, { Request, Response } from "express";

import { Users } from "../../models/Users";

export const meRouter = express.Router();

meRouter.get("/my-profile/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const meUser = await Users.findOne({ where: { id: itemId } });
    res.status(200).json(meUser?.details);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});
