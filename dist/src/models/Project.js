"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const db_1 = require("../connections/db");
class Project extends sequelize_1.Model {
    get details() {
        return {
            id: this.id,
            title: this.title,
            discription: this.discription,
            createdBy: this.created_by,
            createdAt: (0, moment_1.default)(this.created_at).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: (0, moment_1.default)(this.updated_at).format("YYYY-MM-DD HH:mm:ss"),
        };
    }
}
exports.Project = Project;
Project.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
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
    modelName: "Project",
    tableName: "project",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
});
