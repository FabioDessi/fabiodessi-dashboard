const { body, validationResult } = require('express-validator');

const validMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const createWorkExperienceValidation = [
  body('role').notEmpty().withMessage('Role is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('startDateMonth')
    .notEmpty()
    .withMessage('Start Date Month is required')
    .custom((value) => validMonths.includes(value))
    .withMessage('Start Date Month must be a valid month name'),
  body('startDateYear')
    .notEmpty()
    .withMessage('Start Date Year is required')
    .isNumeric()
    .withMessage('Start Date Year must be a number'),
  body('stillOpen')
    .optional()
    .isBoolean()
    .withMessage('Still Open must be a boolean value'),
  body('endDateMonth')
    .if(body('stillOpen').not().equals('true'))
    .notEmpty()
    .withMessage('End Date Month is required when Still Open is not checked')
    .custom((value) => validMonths.includes(value))
    .withMessage('End Date Month must be a valid month name'),
  body('endDateYear')
    .if(body('stillOpen').not().equals('true'))
    .notEmpty()
    .withMessage('End Date Year is required when Still Open is not checked')
    .isNumeric()
    .withMessage('End Date Year must be a number'),
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

const updateWorkExperienceValidation = [
  body('role').notEmpty().withMessage('Role is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('startDateMonth')
    .notEmpty()
    .withMessage('Start Date Month is required')
    .custom((value) => validMonths.includes(value))
    .withMessage('Start Date Month must be a valid month name'),
  body('startDateYear')
    .notEmpty()
    .withMessage('Start Date Year is required')
    .isNumeric()
    .withMessage('Start Date Year must be a number'),
  body('stillOpen')
    .optional()
    .isBoolean()
    .withMessage('Still Open must be a boolean value'),
  body('endDateMonth')
    .if(body('stillOpen').not().equals('true'))
    .notEmpty()
    .withMessage('End Date Month is required when Still Open is not checked')
    .custom((value) => validMonths.includes(value))
    .withMessage('End Date Month must be a valid month name'),
  body('endDateYear')
    .if(body('stillOpen').not().equals('true'))
    .notEmpty()
    .withMessage('End Date Year is required when Still Open is not checked')
    .isNumeric()
    .withMessage('End Date Year must be a number'),
  body('description').notEmpty().withMessage('Description is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { workExperienceId } = req.params;
      const workExperience = { ...req.body, id: workExperienceId };

      return res.status(200).render('partials/workExperienceForm', {
        workExperience,
        errors: errors.mapped(),
      });
    }
    next();
  },
];

module.exports = {
  createWorkExperienceValidation,
  updateWorkExperienceValidation,
};
