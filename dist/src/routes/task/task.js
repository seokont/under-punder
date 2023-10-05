"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const Task_1 = require("../../models/Task");
const moment_1 = __importDefault(require("moment"));
exports.taskRouter = express_1.default.Router();
exports.taskRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    try {
        const tasks = yield Task_1.Task.findAll({ where: { id_project: itemId } });
        res.status(201).json({ tasks: tasks.map((i) => i.details) });
    }
    catch (error) {
        res.status(500).json({ error: "New Task failed" });
    }
}));
exports.taskRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    try {
        yield Task_1.Task.destroy({
            where: {
                id: itemId,
            },
        });
        res.status(201).json({ message: "ok" });
    }
    catch (error) {
        res.status(500).json({ error: "New Task failed" });
    }
}));
exports.taskRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, discription, deadline, id_project, created_by } = req.body;
        const newTask = new Task_1.Task({
            id: (0, uuid_1.v4)(),
            statuses: "28e09d0e-bf38-4c6f-a787-3ec7e222f227",
            id_project,
            created_by,
            title,
            discription,
            deadline: (0, moment_1.default)(deadline).utc().format("YYYY-MM-DD HH:mm:ss"),
        });
        yield newTask.save();
        res.status(201).json({ message: req.body });
    }
    catch (error) {
        res.status(500).json({ error: req.body });
    }
}));
exports.taskRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        yield Task_1.Task.update({
            title: req.body.title,
            discription: req.body.discription,
            statuses: req.body.statuses,
        }, {
            where: {
                id: itemId,
            },
        });
        res.status(200).json({
            Status: "ok",
        });
    }
    catch (error) {
        res.status(500).json({ error: "New Project failed" });
    }
}));
