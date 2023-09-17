const express = require('express');

const {
  getWorkExperiences,
  getWorkExperience,
} = require('../controllers/apiWorkExperiencesController');

const router = express.Router();

router.get('/', getWorkExperiences);
router.get('/:workExperienceId', getWorkExperience);

module.exports = router;
