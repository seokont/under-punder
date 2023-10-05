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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../../models/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const hasPermission_1 = require("../../../src/middleware/hasPermission");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, nickname, first_name, second_name, last_name, phone, photo, } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new Users_1.Users({
            id: (0, uuid_1.v4)(),
            role_id: (0, uuid_1.v4)(),
            sub_role: (0, uuid_1.v4)(),
            email,
            nickname,
            first_name,
            second_name,
            last_name,
            phone,
            photo,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
}));
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Users_1.Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, "secret_key");
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
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}));
exports.authRouter.get("/allusers", hasPermission_1.checkAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users_1.Users.findAll();
        res.status(200).json({ users: users.map(l => l.details) });
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}));
