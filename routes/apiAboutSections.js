const express = require('express');

const { getAboutSections } = require('../controllers/apiAboutSectionsController');

const router = express.Router();

router.get('/', getAboutSections);

module.exports = router;
