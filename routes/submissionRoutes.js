const express = require('express');
const { submitAssignment, evaluateAssignment, getStudentGrade } = require('../controllers/submissionControllers');
const router = express.Router();

router.get('/:id', getStudentGrade)
router.post('/submit', submitAssignment)
router.put('/evalute/:id', evaluateAssignment)

module.exports = router