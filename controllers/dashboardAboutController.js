const fs = require('fs');
const path = require('path');
const AboutSection = require('../models/AboutSection');

// About Page Sections view
const aboutSectionsView = async (req, res) => {
  try {
    const list = await AboutSection.find({});
    res.render('pages/aboutSections', {
      currentUrl: req.originalUrl,
      title: 'About Sections',
      list,
    });
  } catch (error) {
    console.log(error);
  }
};

// Single About Section 
const aboutSectionView = async (req, res) => {
  const { aboutSectionId } = req.params;

  try {
    const aboutSection = await AboutSection.findById(aboutSectionId);
    console.log('aboutSectionView', aboutSection);

    res.render('pages/aboutSection', {
      currentUrl: req.originalUrl,
      title: 'Update about section',
      aboutSection,
    });
  } catch (error) { 
    console.log(error);
  }
};

// Create new About Section aboutView
const createAboutSectionView = (req, res) => {
  res.render('pages/createAboutSection', {
    currentUrl: req.originalUrl,
    title: 'Create new about section',
  });
};

// Create new About Section
const createAboutSection = async (req, res) => {
  console.log(req.body);
  const { titleFirstLine, titleSecondLine, introTitle, introContent } = req.body;
  const title = {
    firstLine: titleFirstLine,
    secondLine: titleSecondLine,
  };
  const intro = {
    title: introTitle,
    content: introContent,
  };

  const newAboutSection = new AboutSection({
    title,
    intro,
  });

  try {
    await newAboutSection.save();
    res.redirect('/about-sections');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
}

// Update About Section
const updateAboutSection = async (req, res) => {
  const { titleFirstLine, titleSecondLine, introTitle, introContent } = req.body;
  const { aboutSectionId } = req.params;
  const title = {
    firstLine: titleFirstLine,
    secondLine: titleSecondLine,
  };
  const intro = {
    title: introTitle,
    content: introContent,
  };

  try {
    const updateAboutSection = await AboutSection.findByIdAndUpdate(
      aboutSectionId, 
      {
        title,
        intro,
      },
      { new: true }
    );
    
    res.render('partials/aboutSectionForm', {
      aboutSection: updateAboutSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
}

// Delete About Sections
const deleteAboutSection = async (req, res) => {
  const { aboutSectionId } = req.params;

  try {
    await AboutSection.findByIdAndDelete(aboutSectionId);
    const list = await AboutSection.find({});

    res.render('pages/aboutSections', {
      currentUrl: req.originalUrl,
      title: 'About Sections',
      list,
      notification : {
        type: 'success',
        message: 'About section deleted successfully',
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
}

module.exports = { aboutSectionsView, aboutSectionView, createAboutSection, createAboutSectionView, updateAboutSection, deleteAboutSection };
