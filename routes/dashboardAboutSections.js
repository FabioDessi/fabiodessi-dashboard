const express = require('express');
const { aboutSectionsView, aboutSectionView, createAboutSection, createAboutSectionView, updateAboutSection, deleteAboutSection, createAboutSectionBlock, removeAboutSectionBlock } = require('../controllers/dashboardAboutController');

const router = express.Router();

router.get('/', aboutSectionsView);
router.get('/create', createAboutSectionView);
router.get('/new-about-block', createAboutSectionBlock);
router.post('/create', createAboutSection);
router.delete('/remove-about-block', removeAboutSectionBlock);

router.get('/:aboutSectionId', aboutSectionView);
router.put('/:aboutSectionId', updateAboutSection);
router.delete('/:aboutSectionId', deleteAboutSection);

module.exports = router;
