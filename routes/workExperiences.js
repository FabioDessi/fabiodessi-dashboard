const express = require('express');
const {
  workExperiencesView,
  workExperienceView,
  createWorkExperience,
  createWorkExperienceView,
  deleteWorkExperience,
  updateWorkExperience,
} = require('../controllers/workExperiencesController');

const router = express.Router();

router.get('/', workExperiencesView);
router.get('/create', createWorkExperienceView);
router.get('/:workExperienceId', workExperienceView);

router.put('/:workExperienceId', updateWorkExperience);
router.post('/create', createWorkExperience);
router.delete('/:workExperienceId', deleteWorkExperience);

module.exports = router;
