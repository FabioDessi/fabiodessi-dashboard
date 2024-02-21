const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const convertKebabCaseToCamelCase = require('./middleware/convertKebabCaseToCamelCase');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const database = process.env.MONGOLAB_URI;

app.use(express.urlencoded({ extended: false }));
app.use(convertKebabCaseToCamelCase);
app.use(express.json());
app.use(cors());

mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log(err));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/dashboard', { title: 'Homepage' });
});

// Work experiences routes
app.use('/work-experiences', require('./routes/dashboardWorkExperiences'));
app.use('/api/work-experiences', require('./routes/apiWorkExperiences'));

// About routes
app.use('/about-sections', require('./routes/dashboardAboutSections'));

// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// Error handling middleware (for 500 and other errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, console.log('Server started on port: ' + PORT));
