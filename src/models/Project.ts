import moment from "moment";
import { DataTypes, Model, Sequelize } from "sequelize";
import { db as sequelize } from "../connections/db";

export interface IProject {
  id: string;
  title: string;
  discription: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProjectDetails {
  id: string;
  title: string;
  discription: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export class Project extends Model implements IProject {
  public id!: string;
  public title!: string;
  public discription!: string;
  public created_at!: string;
  public created_by!: string;
  public updated_at!: string;
  public deleted_at!: string | null;

  public get details(): ProjectDetails {
    return {
      id: this.id,
      title: this.title,
      discription: this.discription,
      createdBy: this.created_by,
      createdAt: moment(this.created_at).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment(this.updated_at).format("YYYY-MM-DD HH:mm:ss"),
    };
  }
}

Project.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    discription: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
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
    deleted_at: {
      type: "TIMESTAMP",
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "project",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
