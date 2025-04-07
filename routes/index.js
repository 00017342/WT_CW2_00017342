const {Router} = require('express');
const router = Router();
const booksRouter = require('./books');
const reviewsRouter = require('./reviews');
const bookService = require('../services/bookService');
const reviewService = require('../services/reviewService');

// Importing the books and reviews routers
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);

// This route serves as a landing page for the application
router.get('/', async (req, res) => {
  try {
    // Get featured books (latest 4 books)
    const allBooks = await bookService.getAllBooks();
    const featuredBooks = allBooks.slice(-4).reverse();
    
    // Get latest reviews (latest 4 reviews)
    const allReviews = await reviewService.getAllReviews();
    const latestReviews = allReviews.slice(-4).reverse();
    
    // Render the landing page with data
    res.render('home', {
      featuredBooks,
      latestReviews,
      books: allBooks,
      messages: req.query.message ? { success: req.query.message } : {}
    });
  } catch (error) {
    console.error('Error loading landing page data:', error);
    res.render('home', {
      featuredBooks: [],
      latestReviews: [],
      books: [],
      messages: { error: 'Failed to load data' }
    });
  }
});

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

module.exports = router;