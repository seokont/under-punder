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
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const Project_1 = require("../../models/Project");
exports.projectRouter = express_1.default.Router();
exports.projectRouter.post("/create-project", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, discription, created_by } = req.body;
        const newProject = new Project_1.Project({
            id: (0, uuid_1.v4)(),
            title,
            discription,
            created_by,
        });
        yield newProject.save();
        res.status(201).json({ message: "New Project successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "New Project failed" });
    }
}));
exports.projectRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const proj = yield Project_1.Project.findAll({ where: { created_by: itemId } });
        res.status(200).json({
            items: proj.map((j) => j.details),
            count: proj.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: "New Project failed" });
    }
}));
exports.projectRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        yield Project_1.Project.destroy({
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
exports.projectRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        yield Project_1.Project.update({
            title: req.body.title,
            discription: req.body.discription,
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
