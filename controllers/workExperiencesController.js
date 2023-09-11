const WorkExperience = require('../models/WorkExperience');

// Work Experiences List
const workExperiencesView = async (req, res) => {
  try {
    const list = await WorkExperience.find({});
    res.render('workExperiences', {
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
    res.render('workExperience', { workExperience });
  } catch (error) {
    console.log(error);
  }
};

// Create new Work Experience View
const createWorkExperienceView = (req, res) => {
  res.render('createWorkExperience');
};

// Create new Work Experience
const createWorkExperience = async (req, res) => {
  const { title, description } = req.body;
  const newWorkExperience = new WorkExperience({
    title,
    description,
  });

  try {
    newWorkExperience.save();
    res.redirect('/work-experiences');
  } catch (error) {
    console.log(error);
  }
};

// Update Work Experience
const updateWorkExperience = async (req, res) => {
  const { title, description } = req.body;
  const { workExperienceId } = req.params;

  try {
    await WorkExperience.findByIdAndUpdate(workExperienceId, {
      title,
      description,
    });
    res.json({
      success: true,
      message: 'Work experience updated successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete Work Experience
const deleteWorkExperience = async (req, res) => {
  const { workExperienceId } = req.params;
  try {
    await WorkExperience.findByIdAndDelete(workExperienceId);
    res.json({
      success: true,
      message: 'Work experience deleted successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
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
