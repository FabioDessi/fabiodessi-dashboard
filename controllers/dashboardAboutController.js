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

    res.render('pages/aboutSection', {
      currentUrl: req.originalUrl,
      title: 'Update about section',
      aboutSection,
    });
  } catch (error) { 
    console.log(error);
  }
};

// Create new About Section View
const createAboutSectionView = (req, res) => {
  res.render('pages/createAboutSection', {
    currentUrl: req.originalUrl,
    title: 'Create new about section',
  });
};

// Create new About Section block
const createAboutSectionBlock = (req, res) => {
  res.render('partials/blocksRowForm');
}

// Create new About Section
const createAboutSection = async (req, res) => {
  const { titleFirstLine, titleSecondLine, introTitle, introContent, blockTitle, blockContent } = req.body;
  let blocks = [];

  const title = {
    firstLine: titleFirstLine,
    secondLine: titleSecondLine,
  };

  const intro = {
    title: introTitle,
    content: introContent,
  };

  if (typeof blockTitle === 'string') {
    blocks.push({
      title: blockTitle,
      content: blockContent,
    });
  }

  if (typeof blockTitle === 'object') {
    for (let i = 0; i < blockTitle.length; i++) {
      blocks.push({
        title: blockTitle[i],
        content: blockContent[i],
      });
    }
  }

  const newAboutSection = new AboutSection({
    title,
    intro,
    blocks,
  });

  try {
    await newAboutSection.save();
    res.redirect('/about-sections');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
}

// Remove About Section block
const removeAboutSectionBlock = (req, res) => {
  res.status(200).send();
}

// Update About Section
const updateAboutSection = async (req, res) => {
  const { titleFirstLine, titleSecondLine, introTitle, introContent, blockTitle, blockContent } = req.body;
  const { aboutSectionId } = req.params;
  let blocks = [];

  if (typeof blockTitle === 'string') {
    blocks.push({
      title: blockTitle,
      content: blockContent,
    });
  }

  if (typeof blockTitle === 'object') {
    for (let i = 0; i < blockTitle.length; i++) {
      blocks.push({
        title: blockTitle[i],
        content: blockContent[i],
      });
    }
  }

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
        blocks,
      },
      { new: true }
    );

    res.render('partials/aboutSectionForm', {
      aboutSection: updateAboutSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error')
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

module.exports = { aboutSectionsView, aboutSectionView, createAboutSection, createAboutSectionView, updateAboutSection, deleteAboutSection, createAboutSectionBlock, removeAboutSectionBlock };
