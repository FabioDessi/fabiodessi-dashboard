const express = require('express');
const {
  createWorkExperienceValidation,
  updateWorkExperienceValidation,
} = require('../utils/validation');

const {
  workExperiencesView,
  workExperienceView,
  createWorkExperience,
  createWorkExperienceView,
  deleteWorkExperience,
  updateWorkExperience,
} = require('../controllers/dashboardWorkExperiencesController');

const router = express.Router();

router.get('/', workExperiencesView);
router.get('/create', createWorkExperienceView);
router.get('/:workExperienceId', workExperienceView);

router.put(
  '/:workExperienceId',
  updateWorkExperienceValidation,
  updateWorkExperience
);
router.post('/create', createWorkExperienceValidation, createWorkExperience);
router.delete('/:workExperienceId', deleteWorkExperience);

module.exports = router;
