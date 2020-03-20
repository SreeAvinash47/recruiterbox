const express = require('express');
const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;
const app = express();

// Connect to MongoDB

mongoose
  .connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server listening on port: ${port}`))