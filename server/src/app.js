const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

app.set('port', 3001);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/newBoard', require('./routes/board'));
app.use('/api/play', require('./routes/play'));

module.exports = app;



