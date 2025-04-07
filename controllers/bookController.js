const { validationResult } = require('express-validator');
const bookService = require('../services/bookService');

const bookController = {
    
    // Display list of all books
    list: async (req, res) => {
        try {
            const books = await bookService.getAllBooks();
            res.render('books/list', { 
                books, 
                messages: req.query.message ? { success: req.query.message } : {}
            });
        } catch (error) {
            console.error('Error fetching books:', error);
            res.render('books/list', { 
                books: [], 
                messages: { error: 'Failed to load books' }
            });
        }
    },

    // Display book creation form
    createForm: (req, res) => {
        res.render('books/create');
    },

    // Validation middleware
    validateBook: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Format validation errors for display
            const formattedErrors = errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }));
            
            // If it's an update, get the book ID from params
            const bookId = req.params.id ? parseInt(req.params.id) : null;
            
            // Determine if this is for create or update
            const viewPath = bookId ? 'books/edit' : 'books/create';
            
            // Book data from form submission
            const book = {
                id: bookId,
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                published_year: req.body.published_year ? parseInt(req.body.published_year) : '',
                isbn: req.body.isbn
            };
            return res.render(viewPath, {
                book,
                errors: formattedErrors,
                messages: { error: 'Please correct the errors below' }
            });
        }
        
        next();
    },

    // Handle book creation
    store: async (req, res) => {
        try {
            const bookData = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                published_year: parseInt(req.body.published_year),
                isbn: req.body.isbn
            };
            const newBook = await bookService.createBook(bookData);
            res.redirect('/books?message=Book added successfully');
        } catch (error) {
            console.error('Error creating book:', error);
            res.render('books/create', { 
                book: req.body, 
                messages: { error: 'Failed to create book' }
            });
        }
    },

    // Display single book details
    show: async (req, res) => {
        try {
            const bookId = parseInt(req.params.id);
            const book = await bookService.getBookById(bookId);
            if (!book) {
                return res.render('books/detail', { 
                    book: null, 
                    reviews: [],
                    messages: { error: 'Book not found' }
                });
            }
            const reviews = await bookService.getReviewsByBookId(bookId);
            res.render('books/detail', { book, reviews });
        } catch (error) {
            console.error('Error fetching book details:', error);
            res.render('books/detail', { 
                book: null, 
                reviews: [],
                messages: { error: 'Failed to load book details' }
            });
        }
    },

    // Display book edit form and error handling
    editForm: async (req, res) => {
        try {
            const bookId = parseInt(req.params.id);
            const book = await bookService.getBookById(bookId);
            
            if (!book) {
                return res.redirect('/books?message=Book not found');
            }
            
            res.render('books/edit', { book });
        } catch (error) {
            console.error('Error fetching book for editing:', error);
            res.redirect('/books?message=Error loading book');
        }
    },

    // Handle book update
    update: async (req, res) => {
        try {
            const bookId = parseInt(req.params.id);
            const bookData = {
                id: bookId,
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                published_year: parseInt(req.body.published_year),
                isbn: req.body.isbn
            };
            
            const updated = await bookService.updateBook(bookId, bookData);
            
            if (!updated) {
                return res.render('books/edit', { 
                    book: bookData, 
                    messages: { error: 'Book not found or could not be updated' }
                });
            }
            
            res.redirect(`/books/${bookId}?message=Book updated successfully`);
        } catch (error) {
            console.error('Error updating book:', error);
            res.render('books/edit', { 
                book: req.body, 
                messages: { error: 'Failed to update book' }
            });
        }
    },

    // Handle book delete
    delete: async (req, res) => {
        try {
            const bookId = parseInt(req.params.id);
            const deleted = await bookService.deleteBook(bookId);
            
            if (!deleted) {
                return res.redirect(`/books/${bookId}?message=Failed to delete book`);
            }
            
            res.redirect('/books?message=Book deleted successfully');
        } catch (error) {
            console.error('Error deleting book:', error);
            res.redirect(`/books/${req.params.id}?message=Error deleting book`);
        }
    }
};

module.exports = bookController;