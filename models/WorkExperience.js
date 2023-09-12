const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const WorkExperience = mongoose.model('WorkExperience', WorkExperienceSchema);

module.exports = WorkExperience;
