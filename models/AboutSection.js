const mongoose = require('mongoose');

const aboutSectionSchema = new mongoose.Schema({
  title: {
    firstLine: String,
    secondLine: String,
  },
  intro: {
    title: String,
    content: String,
  },
  blocks: [{
    title: String,
    content: String,
  }],
});

const AboutSection = mongoose.model('AboutSection', aboutSectionSchema);

module.exports = AboutSection;
