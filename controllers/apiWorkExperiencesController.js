const WorkExperience = require('../models/WorkExperience');

const getWorkExperiences = async (req, res) => {
  try {
    const list = await WorkExperience.find({});

    const response = {
      status: 'success',
      count: list.length,
      data: list,
    };

    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const getWorkExperience = async (req, res) => {
  const { workExperienceId } = req.params;

  try {
    const workExperience = await WorkExperience.findById(workExperienceId);

    const response = {
      status: 'success',
      data: workExperience,
    };

    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching work experience by id', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getWorkExperiences,
  getWorkExperience,
};
