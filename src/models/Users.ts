import bcrypt from "bcrypt";
import moment from "moment";
import { DataTypes, Model, Sequelize } from "sequelize";
import { db as sequelize } from "../connections/db";

export interface IUser {
  id: string;
  role_id: string;
  email: string | null;
  password: string;
  nickname: string | null;
  first_name: string;
  second_name: string;
  last_name: string;

  phone: string;
  photo: string | null;

  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  deleted_at: string | null;
}

export interface UserDetails {
  id: string;
  nickname: string | null;
  firstName: string;
  secondName: string;
  lastName: string;

  roleId: string;
  subRole: number;

  photo: string | null;
  phone: string;
  email: string | null;

  createdAt: string;
  updatedAt: string;
}

export class Users extends Model implements IUser {
  public id!: string;
  public role_id!: string;
  public sub_role!: number;
  public email!: string | null;
  public password!: string;
  public nickname!: string | null;
  public first_name!: string;
  public second_name!: string;
  public last_name!: string;


  public phone!: string;
  public photo!: string | null;

  public created_at!: string;
  public updated_at!: string;
  public last_login_at!: string | null;
  public deleted_at!: string | null;

  public get details(): UserDetails {
    return {
      id: this.id,
      roleId: this.role_id,
      subRole: this.sub_role,

      nickname: this.nickname?.split(" ")[0] ?? null,
      firstName: this.first_name,
      secondName: this.second_name,
      lastName: this.last_name,

      phone: this.phone,
      photo: this.photo,
      email: this.email?.split(" ")[0] ?? null,

      createdAt: moment(this.created_at).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment(this.updated_at).format("YYYY-MM-DD HH:mm:ss"),
    };
  }
}

Users.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.CHAR(36),
      defaultValue: null,
      allowNull: true,
    },
    sub_role: {
      type:  DataTypes.CHAR(36),
      defaultValue: null,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    second_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },

    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },

    created_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "users",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
