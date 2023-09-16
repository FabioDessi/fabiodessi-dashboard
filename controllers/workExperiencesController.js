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

  try {
    const workExperience = await WorkExperience.findById(workExperienceId);
    res.render('pages/workExperience', {
      currentUrl: req.originalUrl,
      title: 'Update work experience',
      workExperience,
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
    res.render('pages/workExperience', {
      currentUrl: req.originalUrl,
      title: 'Update work experience',
      workExperience: updateWorkExperience,
      notification: {
        type: 'success',
        msg: 'Work experience updates successfully',
      },
    });
  } catch (error) {
    console.log(error);
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
