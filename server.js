const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dataPackets = require('./routes/api/dataPackets');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => {
    console.log('Error connecting to MongoDB')
    console.log(err)});

app.use('/api/data', dataPackets);
require('./routes/auth/authenticationRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));