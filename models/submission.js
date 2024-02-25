const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

const Submission = sequelize.define('Submission', {
    studentId: DataTypes.INTEGER,
    assignmentId: DataTypes.INTEGER,
    submittedAt: DataTypes.DATE,
    grade: DataTypes.INTEGER
});

sequelize.sync()

module.exports = Submission