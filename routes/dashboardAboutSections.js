const express = require('express');
const { aboutSectionsView, aboutSectionView, createAboutSection, createAboutSectionView, updateAboutSection, deleteAboutSection } = require('../controllers/dashboardAboutController');

const router = express.Router();

router.get('/', aboutSectionsView);
router.get('/create', createAboutSectionView);
router.get('/:aboutSectionId', aboutSectionView);

router.put('/:aboutSectionId', updateAboutSection);
router.post('/create', createAboutSection);
router.delete('/:aboutSectionId', deleteAboutSection);

module.exports = router;
