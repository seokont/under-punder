import { Sequelize, GEOMETRY, GEOGRAPHY } from 'sequelize';
import wkx from 'wkx';
import * as config from '../config/db.json';







export const db = new Sequelize(config.db, config.user, config.password, {
    ...config.connection,
    // logging: app.environment === 'dev' ? (message) => dbLogger.info(message) : false,
    dialect: 'mysql',
    // timezone:'-01:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  