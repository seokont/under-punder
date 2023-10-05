import moment from "moment";
import { DataTypes, Model, Sequelize } from "sequelize";
import { db as sequelize } from "../connections/db";

export interface ITask {
  id: string;
  title: string;
  discription: string;
  serial_number: number;
  statuses: string;
  id_project: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  deadline: string;
}

export interface TaskDetails {
  id: string;
  title: string;
  discription: string;
  serialNumber: number;
  statuses: string;
  idProject: string;
  createdBy: string;
  createdAt: string;
  deadline: string;
  updatedAt: string;
}

export class Task extends Model implements ITask {
  public id!: string;
  public title!: string;
  public discription!: string;
  public serial_number!: number;
  public statuses!: string;
  public id_project!: string;
  public created_by!: string;
  public created_at!: string;
  public deadline!: string;
  public updated_at!: string;
  public deleted_at!: string | null;

  public get details(): TaskDetails {
    return {
      id: this.id,
      title: this.title,
      statuses: this.statuses,
      idProject: this.id_project,
      createdBy: this.created_by,
      serialNumber: this.serial_number,
      discription: this.discription,
      deadline: moment(this.deadline).format("YYYY-MM-DD HH:mm:ss"),
      createdAt: moment(this.created_at).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment(this.updated_at).format("YYYY-MM-DD HH:mm:ss"),
    };
  }
}

Task.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      
      allowNull: false,
    },
    statuses: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    id_project: {
      type: DataTypes.CHAR(36),
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
    serial_number: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    deadline: {
      type: "TIMESTAMP",
      allowNull: false,
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
    modelName: "Task",
    tableName: "task",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
