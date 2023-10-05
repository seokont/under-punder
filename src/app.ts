import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import createHttpError from "http-errors";
import { authRouter } from "./routes/auth/auth";
import { projectRouter } from "./routes/project/project";
import { taskRouter } from "./routes/task/task";
import { meRouter } from "./routes/me/me";


const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", (req, res) => {
  return res.sendStatus(200);
});

app.get("/", (req, res) => res.json({ok: 'yes'}));

app.use('/auth', authRouter);
app.use('/project', projectRouter);
app.use('/task', taskRouter);
app.use('/admin', meRouter);

export default { app, server };
