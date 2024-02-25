const Submission = require("../models/submission")

exports.submitAssignment = async (req, res) => {

    try {
        const { assignmentId, studentId } = req.body
        const submission = await Submission.create({
            assignmentId,
            studentId,
            submittedAt: new Date()
        })

        res.status(200).json({ submission })
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
}

exports.evaluateAssignment = async (req, res) => {

    try {
        const { id } = req.params
        const { grade } = req.body
        const submission = await Submission.findByPk(id)

        if (!submission) {
            return res.status(400).send('Submission not found')
        }

        submission.grade = grade
        await submission.save()

        res.status(200).json({ submission })
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }

}

exports.getStudentGrade = async (req, res) => {
    try {
        const { id } = req.params
        const submissions = await Submission.findAll({
            where: { studentId: id }
        })

        res.status(200).json({ submissions });
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
}