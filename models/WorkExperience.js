const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  // companyLogo: {
  //   type: ???,
  //   required: true,
  // },
  startDateMonth: {
    type: String,
    required: true,
  },
  startDateYear: {
    type: String,
    required: true,
  },
  endDateMonth: {
    type: String,
  },
  endDateYear: {
    type: String,
  },
  stillOpen: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const WorkExperience = mongoose.model('WorkExperience', WorkExperienceSchema);

module.exports = WorkExperience;
