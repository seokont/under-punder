"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const db_1 = require("../connections/db");
class Users extends sequelize_1.Model {
    get details() {
        var _a, _b, _c, _d;
        return {
            id: this.id,
            roleId: this.role_id,
            subRole: this.sub_role,
            nickname: (_b = (_a = this.nickname) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) !== null && _b !== void 0 ? _b : null,
            firstName: this.first_name,
            secondName: this.second_name,
            lastName: this.last_name,
            phone: this.phone,
            photo: this.photo,
            email: (_d = (_c = this.email) === null || _c === void 0 ? void 0 : _c.split(" ")[0]) !== null && _d !== void 0 ? _d : null,
            createdAt: (0, moment_1.default)(this.created_at).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: (0, moment_1.default)(this.updated_at).format("YYYY-MM-DD HH:mm:ss"),
        };
    }
}
exports.Users = Users;
Users.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    role_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        defaultValue: null,
        allowNull: true,
    },
    sub_role: {
        type: sequelize_1.DataTypes.CHAR(36),
        defaultValue: null,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    second_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
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
    last_login_at: {
        type: "TIMESTAMP",
        defaultValue: null,
        allowNull: true,
    },
    deleted_at: {
        type: "TIMESTAMP",
        defaultValue: null,
        allowNull: true,
    },
}, {
    sequelize: db_1.db,
    modelName: "Users",
    tableName: "users",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
});
