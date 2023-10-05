import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Project } from "../../models/Project";

export const projectRouter = express.Router();

projectRouter.post("/create-project", async (req, res) => {
  try {
    const { title, discription, created_by } = req.body;
    const newProject = new Project({
      id: uuidv4(),
      title,
      discription,
      created_by,
    });
    await newProject.save();
    res.status(201).json({ message: "New Project successfully" });
  } catch (error) {
    res.status(500).json({ error: "New Project failed" });
  }
});

projectRouter.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const proj = await Project.findAll({ where: { created_by: itemId } });

    res.status(200).json({
      items: proj.map((j) => j.details),
      count: proj.length,
    });
  } catch (error) {
    res.status(500).json({ error: "New Project failed" });
  }
});

projectRouter.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await Project.destroy({
      where: {
        id: itemId,
      },
    });

    res.status(200).json({
      Status: "ok",
    });
  } catch (error) {
    res.status(500).json({ error: "New Project failed" });
  }
});

projectRouter.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    await Project.update(
      {
        title: req.body.title,
        discription: req.body.discription,
      },
      {
        where: {
          id: itemId,
        },
      }
    );

    res.status(200).json({
      Status: "ok",
    });
  } catch (error) {
    res.status(500).json({ error: "New Project failed" });
  }
});
