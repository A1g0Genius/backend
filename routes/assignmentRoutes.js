const express = require('express');
const { createAssignment, getAllAssignment, updateAssignment, deleteAssignment } = require('../controllers/assignmentControllers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/create', createAssignment)
router.get('/', getAllAssignment)
router.put('/:id', updateAssignment)
router.delete('/:id', deleteAssignment)

module.exports = router
