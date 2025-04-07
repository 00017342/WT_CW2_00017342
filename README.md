# 📚iReview

## 🧐 Project philosophy
    iReview is a book shelf right inside your web. Create, read, update, delete, rate your books inside iReview. If you were interested in books, It is definitely your best choice!

## 👨‍💻 Tech stack
### Languages:

    Html
    CSS
    Javascript
    JSON

### Technologies:
    
    Node.js
    Express
    Express-validator
    Express-ejs-layouts
    EJS
    Bootstrap

## 🛠️Install packages
```bash
npm install
```

## 📍Run locally
```bash
npm run dev
```

## Project structure
```
├── controllers               <- All controllers are here. Controller logic
|                                required for handling routed actions
|   ├── bookController.js     <- Managing books in app. Handling listing,
|   ├──                          viewing, CRUD entries.
|   ├── reviewController.js   <- Managing reviews in app. Handling listing,
|   ├──                          viewing, CRUD entries. 
├── databases                 <- Databases are here. Collections for adding
|                                creating, removing books' info
|   ├── mock_db.json          <- JSON db for the site
├── public                    <- All styles, javascripts and images are here.
|                                Files required for styling are here. Js file
|                                that is need for future is here too.
|   ├── images                <- All images on site are here.
│   ├──       ├── books-bg.jpg<- Background image for main page.
|   ├── javascripts           <- All js files are here.
│   ├──       ├── script.js   <- JS script needed for future if we want to
│   ├──       ├──                add something.
|   ├── styles                <- CSS file and Bootstrap connection is here.
│   ├──       ├── bootstrap.min.css <- Bootstrap generated connection.
│   ├──       ├── style.css         <- CSS file for styling the whole pages.
├── routes                    <- All routes are here.
│   ├── books.js              <- Routes for handling, listing, viewing, CRUD
|   ├──                       entries of books. Connecting URL paths to controller and
|   ├──                       validation.
│   ├── index.js              <- Setting up main router. Includes routes for
│   ├──                          books, reviews, landing page, health check endpoint.
│   ├── reviews.js            <- Routes for handling, listing, viewing, CRUD
|   ├──                       entries of reviews. Connecting URL paths to controller and
|   ├──                       validation.
├── services                  <- All services used are here.
│   ├── bookService.js        <- Retrieving, creating, updating, deleting books,
│   ├──                          and fetching reviews by reading and writing to a mock JSON database
│   ├── reviewService.js      <- Retrieving, creating, updating, deleting reviews,
│   ├──                          and fetching books by reading and writing to a mock JSON database
├── validators                <- All validators are here.
│   ├── bookValidator.js      <- Validation rules for book data, including checks for title, author,
│   ├──                          genre, publication year, and ISBN format.
├── views                     <- All views are here.
│   ├── books                 <- Interfaces for working with books (CRUD).
│   ├──       ├── create.ejs  <- Interface for creating books with all parameters.
│   ├──       ├── detail.ejs  <- Display selected book with reviews and other options. 
│   ├──       ├── edit.ejs    <- Interface for editing book. 
│   ├──       ├── list.ejs    <- Rendering book list table with options and ability to CRUD. 
│   ├── layouts               <- Layout files of iReview App.
│   ├──       ├── base.ejs    <- Main html layout with responsiveness and dynamic content render.
│   ├── reviews               <- Interfaces for working with reviews (CRUD). 
│   ├──       ├── create.ejs  <- Intierface for creating reviews with all parameters.
│   ├──       ├── detail.ejs  <- Shows detailed review of book, rating, and info.
│   ├──       ├── edit.ejs    <- Editing existing book review. 
│   ├──       ├── list.ejs    <- Listing all book review with options CRUD. 
│   ├── home.ejs              <- Home page with all functions connected. 
├── .gitignore                <- Git ignoring files.
├── app.js                    <- Connecting all files and defining localhost etc.
├── nodemon.json              <- Generated node files.
├── package.json              <- Generated node files. 
├── package-lock.json         <- Generated node files.
└── README.md                 <- Readme with all links and instructions.
```
## Links
```
1. https://github.com/00017342/WT_CW2_00017342.git
2. 
```