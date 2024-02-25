const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING, // need to send email notification to the students
    password: DataTypes.STRING,
    role: DataTypes.STRING
})

sequelize.sync(User)

module.exports = User