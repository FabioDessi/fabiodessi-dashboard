const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const database = process.env.MONGOLAB_URI;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log(err));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home', { title: 'Homepage' });
});

app.use('/work-experiences', require('./routes/workExperiences'));
app.listen(PORT, console.log('Server started on port: ' + PORT));
