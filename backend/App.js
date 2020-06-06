const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// MongoDB server connection.
mongoose.connect('mongodb://127.0.0.1:/videoServer', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


// Used to log everything like GET, POST, etc requests
app.use(morgan('dev'));
// It ensures that we prevent Cross-Origin Resource Sharing(CORS) errors
// If client made req on localhost:4000, and received res from server which
// has localhost:3000 req will fail. It is always the case with RESTful APIs
// So, we attach headers from servers to client to tell browser that it's OK
app.use(cors());
// Extracts json data and makes it easy readable to us
app.use(express.json());
// extended: true allows to parse extended body with rich data in it
// We will use false only allows simple bodies for urlencoded data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/signUp', require('./routes/signUp'));

module.exports = app;