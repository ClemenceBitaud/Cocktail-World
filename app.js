const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');

const app = express(); //création de l'app grâce à express
app.use(helmet());
app.use(compression());

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// ID et pw à cacher dans des variables d'environnement
const dbID = process.env.DB_ID; //dbuser
const dbPW = process.env.DB_PW; //dbUserPassword
// const DB = 'mongodb+srv://'+dbID+':'+dbPW+'@clusterwebservice.nwozssf.mongodb.net/?retryWrites=true&w=majority';
const DB = 'mongodb+srv://dbuser:dbUserPassword@clusterwebservice.nwozssf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
    });

app.use(bodyParser.json());

//routes
const drinkRoutes = require('./routes/drink');
const ingredientRoutes = require('./routes/ingredient');
const categoryRoutes = require('./routes/category');
const typeRoutes = require('./routes/type');
const userRoutes = require('./routes/user');
const pokemonRoutes = require('./routes/pokemon');

app.use('/api/drinks', drinkRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/categories', categoryRoutes);
app.use ('/api/types', typeRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/pokemons', pokemonRoutes);

module.exports = app;