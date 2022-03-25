const express = require('express');
const hbs = require('hbs');
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routers/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(' S T A R T ---> BAXA HATAHOB ');
});
