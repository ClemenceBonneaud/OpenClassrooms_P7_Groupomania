// Installations
const express = require('express');
const path = require('path');

// Routes
const articleRoutes = require("./routes/articlesRoutes");
const userRoutes = require("./routes/usersRoutes");
const shareRoutes = require("./routes/sharesRoutes");


// Appel fonction express
const app = express();

// Application
// ----- Récupération des images
/* app.use('/images', express.static(path.join(__dirname, 'images'))); */ // Pour la partie "GIF" de l'app

// ----- Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use('/api/article', articleRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/share', shareRoutes);

// Export
module.exports = app;