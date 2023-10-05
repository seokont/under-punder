import { DataTypes, Model, Sequelize } from "sequelize";
import { db as sequelize } from "../connections/db";

export interface IStatusesTask {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface StatusesTaskDetails {
  id: string;
  title: string;
}

export class StatusesTask extends Model implements IStatusesTask {
  public id!: string;
  public title!: string;
  public created_at!: string;
  public updated_at!: string;
  public deleted_at!: string | null;

  public get details(): StatusesTaskDetails {
    return {
      id: this.id,
      title: this.title,
    };
  }
}

StatusesTask.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    title: {
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
    modelName: "StatusesTask",
    tableName: "statuses_task",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
