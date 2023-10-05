import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../models/Task";
import moment from "moment";

export const taskRouter = express.Router();

taskRouter.get("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const tasks = await Task.findAll({ where: { id_project: itemId } });
    res.status(201).json({ tasks: tasks.map((i) => i.details) });
  } catch (error) {
    res.status(500).json({ error: "New Task failed" });
  }
});

taskRouter.delete("/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    await Task.destroy({
      where: {
        id: itemId,
      },
    });

    res.status(201).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "New Task failed" });
  }
});

taskRouter.post("/", async (req, res) => {
  try {
    const { title, discription, deadline, id_project, created_by } = req.body;
    const newTask = new Task({
      id: uuidv4(),
      statuses: "28e09d0e-bf38-4c6f-a787-3ec7e222f227",
      id_project,
      created_by,
      title,
      discription,
      deadline: moment(deadline).utc().format("YYYY-MM-DD HH:mm:ss"),
    });
    await newTask.save();
    res.status(201).json({ message: req.body });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
});

taskRouter.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    await Task.update(
      {
        title: req.body.title,
        discription: req.body.discription,
        statuses: req.body.statuses,
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
