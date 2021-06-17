const { DataTypes } = require('sequelize');
const db = require('../database/db');

const user = db.sequelize.define('USERS', {
    ID: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    USERNAME: { type: DataTypes.STRING },
    PASSWORD: { type: DataTypes.STRING }
}, { timestamps: false, freezeTableName: true });
module.exports = user;
