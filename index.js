require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database');
const urlRoutes = require('./routes/urlRoute');

// Basic Configuration
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

// connect database
connectDB();

app.use('/api', urlRoutes);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 'error': 'Internal server error' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
