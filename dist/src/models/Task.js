"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const db_1 = require("../connections/db");
class Task extends sequelize_1.Model {
    get details() {
        return {
            id: this.id,
            title: this.title,
            statuses: this.statuses,
            idProject: this.id_project,
            createdBy: this.created_by,
            serialNumber: this.serial_number,
            discription: this.discription,
            deadline: (0, moment_1.default)(this.deadline).format("YYYY-MM-DD HH:mm:ss"),
            createdAt: (0, moment_1.default)(this.created_at).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: (0, moment_1.default)(this.updated_at).format("YYYY-MM-DD HH:mm:ss"),
        };
    }
}
exports.Task = Task;
Task.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    statuses: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    id_project: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    created_by: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    discription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    serial_number: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    deadline: {
        type: "TIMESTAMP",
        allowNull: false,
    },
    created_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updated_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    deleted_at: {
        type: "TIMESTAMP",
        defaultValue: null,
        allowNull: true,
    },
}, {
    sequelize: db_1.db,
    modelName: "Task",
    tableName: "task",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
});
