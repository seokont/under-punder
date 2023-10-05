"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusesTask = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../connections/db");
class StatusesTask extends sequelize_1.Model {
    get details() {
        return {
            id: this.id,
            title: this.title,
        };
    }
}
exports.StatusesTask = StatusesTask;
StatusesTask.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    title: {
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
    modelName: "StatusesTask",
    tableName: "statuses_task",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
});
