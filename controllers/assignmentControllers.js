const { Assignment } = require('../models/assignment')

const User = require('../models/user')
const emailNotification = require('../utils/emailNotification')

exports.createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate, totalScore, teacherId } = req.body
        const newAssignment = await Assignment.create({
            title: title,
            description: description,
            dueDate: dueDate,
            totalScore: totalScore,
            teacherId: teacherId
        })



        const teacher = await User.findByPk(teacherId)

        const studentList = await User.findAll({
            where: {
                role: "student"
            }
        })
        // console.log(studentList)

        studentList.forEach(stu => {
            // emailNotification(stu, teacher)
        })


        res.status(200).json(newAssignment)
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
}

exports.getAllAssignment = async (req, res) => {
    try {
        const { dueDate, orderBy } = req.query
        let assignments

        if (dueDate && orderBy) {
            assignments = await Assignment.findAll({
                where: {
                    dueDate: dueDate,
                },
                order: [
                    ['totalScore', orderBy === 'asc' ? 'ASC' : 'DESC'],
                ],
            })
        } else if (dueDate) {
            assignments = await Assignment.findAll({
                where: {
                    dueDate: dueDate,
                },
            })
        } else if (orderBy) {
            assignments = await Assignment.findAll({
                order: [
                    ['totalScore', orderBy === 'asc' ? 'ASC' : 'DESC'],
                ],
            })
        } else {
            assignments = await Assignment.findAll()
        }
        res.status(200).json({ assignments })
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
}

exports.updateAssignment = async (req, res) => {

    try {
        const { id } = req.params
        const { title, description, dueDate, totalScore, teacherId } = req.body
        const assignment = await Assignment.findByPk(id)

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' })
        }

        if (teacherId !== assignment.teacherId)
            return res.status(400).send("Assignment not accessible")

        if (title) assignment.title = title
        if (description) assignment.description = description
        if (dueDate) assignment.dueDate = dueDate
        if (totalScore) assignment.totalScore = totalScore

        await assignment.save()

        res.status(200).json({ assignment })
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
}


exports.deleteAssignment = async (req, res) => {

    try {
        const { id } = req.params
        const assignment = await Assignment.findByPk(id)

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' })
        }

        if (assignment.teacherId !== req.body.teacherId)
            return res.status(400).send("Assignment not accessible")

        await assignment.destroy()

        res.status(200).json({ message: 'Assignment deleted successfully' })
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
}


