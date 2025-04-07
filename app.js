const express = require('express')

// for File IO
const path = require('path')

// make mock database (raw .json file) available globally in app
global.mock_db = path.join(__dirname, './databases/mock_db.json');

// for rendering views
const expressLayouts = require('express-ejs-layouts')

// for routing
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/base');

// Static files
app.use('/css', express.static(path.join(__dirname, 'public/styles')));
app.use('/js', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Routes
app.use('/', routes);


const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
