"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth/auth");
const project_1 = require("./routes/project/project");
const task_1 = require("./routes/task/task");
const me_1 = require("./routes/me/me");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.options("*", (req, res) => {
    return res.sendStatus(200);
});
app.get("/", (req, res) => res.json({ ok: 'yes' }));
app.use('/auth', auth_1.authRouter);
app.use('/project', project_1.projectRouter);
app.use('/task', task_1.taskRouter);
app.use('/admin', me_1.meRouter);
exports.default = { app, server };
