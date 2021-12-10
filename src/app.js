const express = require('express');
const morgan = require('morgan');

const app = express();

const Routes = require('./routes');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


app.use('/auth', Routes.AuthenticationRoutes);
app.use('/inspiration', Routes.InspirationRoutes);
app.use('/category', Routes.CategoryRoutes);
app.use('/ins', Routes.Ins);
app.use('/favorite', Routes.FavoritesRoutes);
module.exports = app


