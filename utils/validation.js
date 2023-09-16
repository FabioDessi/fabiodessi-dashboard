const { body, validationResult } = require('express-validator');

const workExperienceValidation = [
  body('role').notEmpty().withMessage('Role is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('startDateMonth')
    .notEmpty()
    .withMessage('Start Date Month is required')
    .isNumeric()
    .withMessage('Start Date Month must be a number'),
  body('startDateYear')
    .notEmpty()
    .withMessage('Start Date Year is required')
    .isNumeric()
    .withMessage('Start Date Year must be a number'),
  body('stillOpen')
    .optional()
    .isBoolean()
    .withMessage('Still Open must be a boolean value'),
  // body('endDateMonth')
  //   .optional()
  //   .notEmpty()
  //   .withMessage('End Date Month is required when Still Open is not checked'),
  // body('endDateYear')
  //   .optional()
  //   .notEmpty()
  //   .withMessage('End Date Year is required when Still Open is not checked')
  //   .isNumeric()
  //   .withMessage('End Date Year must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/createWorkExperience', {
        title: 'Create new work experience',
        errors: errors.mapped(),
      });
    }
    next();
  },
];

module.exports = {
  workExperienceValidation,
};
