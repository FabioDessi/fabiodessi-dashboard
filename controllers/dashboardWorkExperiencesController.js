const fs = require('fs');
const path = require('path');
const WorkExperience = require('../models/WorkExperience');

// Work Experiences List
const workExperiencesView = async (req, res) => {
  try {
    const list = await WorkExperience.find({});
    res.render('pages/workExperiences', {
      currentUrl: req.originalUrl,
      title: 'Work experiences',
      list,
    });
  } catch (error) {
    console.log(error);
  }
};

// Single Work Experience
const workExperienceView = async (req, res) => {
  const { workExperienceId } = req.params;
  // Reading the SVG files
  const infoCircleSvg = fs.readFileSync(
    path.join(__dirname, '../public/assets/info-circle.svg'),
    'utf8'
  );
  const alertTriangleSvg = fs.readFileSync(
    path.join(__dirname, '../public/assets/alert-triangle.svg'),
    'utf8'
  );
  const successCircleSvg = fs.readFileSync(
    path.join(__dirname, '../public/assets/success-circle.svg'),
    'utf8'
  );
  const errorCircleSvg = fs.readFileSync(
    path.join(__dirname, '../public/assets/error-circle.svg'),
    'utf8'
  );

  try {
    const workExperience = await WorkExperience.findById(workExperienceId);
    res.render('pages/workExperience', {
      currentUrl: req.originalUrl,
      title: 'Update work experience',
      workExperience,
      infoCircleSvg,
      alertTriangleSvg,
      successCircleSvg,
      errorCircleSvg,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create new Work Experience View
const createWorkExperienceView = (req, res) => {
  res.render('pages/createWorkExperience', {
    currentUrl: req.originalUrl,
    title: 'Create new work experience',
  });
};

// Create new Work Experience
const createWorkExperience = async (req, res) => {
  const {
    role,
    company,
    type,
    startDateMonth,
    startDateYear,
    endDateMonth,
    endDateYear,
    stillOpen,
    description,
  } = req.body;

  const stillOpenBoolean = stillOpen && stillOpen === 'true' ? true : false;
  const newWorkExperience = new WorkExperience({
    role,
    company,
    type,
    startDateMonth,
    startDateYear,
    endDateMonth,
    endDateYear,
    stillOpen: stillOpenBoolean,
    description,
  });

  try {
    await newWorkExperience.save();
    res.redirect('/work-experiences');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

// Update Work Experience
const updateWorkExperience = async (req, res) => {
  const {
    role,
    company,
    type,
    startDateMonth,
    startDateYear,
    endDateMonth,
    endDateYear,
    stillOpen,
    description,
  } = req.body;

  const { workExperienceId } = req.params;
  const stillOpenBoolean = stillOpen && stillOpen === 'true' ? true : false;

  try {
    const updateWorkExperience = await WorkExperience.findByIdAndUpdate(
      workExperienceId,
      {
        role,
        company,
        type,
        startDateMonth,
        startDateYear,
        endDateMonth,
        endDateYear,
        stillOpen: stillOpenBoolean,
        description,
      },
      { new: true }
    );

    res.render('partials/workExperienceForm', {
      workExperience: updateWorkExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

// Delete Work Experience
const deleteWorkExperience = async (req, res) => {
  const { workExperienceId } = req.params;
  try {
    await WorkExperience.findByIdAndDelete(workExperienceId);
    const list = await WorkExperience.find({});

    res.render('pages/workExperiences', {
      currentUrl: req.originalUrl,
      title: 'Work experiences',
      list,
      notification: {
        type: 'success',
        msg: 'Work experience deleted successfully',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  workExperiencesView,
  workExperienceView,
  createWorkExperience,
  createWorkExperienceView,
  deleteWorkExperience,
  updateWorkExperience,
};
