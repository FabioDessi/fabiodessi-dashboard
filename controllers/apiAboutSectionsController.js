const AboutSection = require('../models/AboutSection');

const getAboutSections = async (req, res) => {
  try {
    const list = await AboutSection.find({});

    const response = {
      status: 'success',
      count: list.length,
      data: list,
    };

    res.status(200).send(response);
  } catch (error) {
    console.error('Error fecthing about sections', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getAboutSections,
};
