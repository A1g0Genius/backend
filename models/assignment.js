const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

const Assignment = sequelize.define('Assignment', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    totalScore: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER
})

sequelize.sync()

module.exports = {
    Assignment,
    sequelize,
}