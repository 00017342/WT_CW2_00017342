const reviewService = require('../services/reviewService');
const bookService = require('../services/bookService');

const reviewController = {
    
    // Display list of all reviews and error handling
    list: async (req, res) => {
        try {
            const reviews = await reviewService.getAllReviews();
            const books = await bookService.getAllBooks();
            
            res.render('reviews/list', { 
                reviews, 
                books,
                messages: req.query.message ? { success: req.query.message } : {}
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
            res.render('reviews/list', { 
                reviews: [], 
                books: [],
                messages: { error: 'Failed to load reviews' }
            });
        }
    },

    // Display review creation form and error handling
    createForm: async (req, res) => {
        try {
            const books = await bookService.getAllBooks();
            const preselectedBookId = req.query.book_id ? parseInt(req.query.book_id) : null;
            
            res.render('reviews/create', { 
                books,
                preselectedBookId
            });
        } catch (error) {
            console.error('Error loading books for review form:', error);
            res.render('reviews/create', { 
                books: [],
                messages: { error: 'Failed to load books' }
            });
        }
    },

    // Handle review creation and error handling
    store: async (req, res) => {
        try {
            const reviewData = {
                book_id: parseInt(req.body.book_id),
                rating: parseFloat(req.body.rating),
                review_text: req.body.review_text,
                reviewer_name: req.body.reviewer_name || 'Anonymous Reader',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const book = await bookService.getBookById(reviewData.book_id);
            if (!book) {
                const books = await bookService.getAllBooks();
                return res.render('reviews/create', {
                    books,
                    preselectedBookId: reviewData.book_id,
                    review: reviewData,
                    messages: { error: 'Selected book not found' }
                });
            }
            //Creating new review and error handling
            const newReview = await reviewService.createReview(reviewData);
            res.redirect(`/books/${reviewData.book_id}?message=Review added successfully`);
        } catch (error) {
            console.error('Error creating review:', error);
            try {
                const books = await bookService.getAllBooks();
                res.render('reviews/create', { 
                    books,
                    review: req.body, 
                    preselectedBookId: parseInt(req.body.book_id),
                    messages: { error: 'Failed to create review' }
                });
            } catch (e) {
                res.redirect('/reviews?message=Error creating review');
            }
        }
    },

    // Display single review details
    show: async (req, res) => {
        try {
            const reviewId = parseInt(req.params.id);
            const review = await reviewService.getReviewById(reviewId);
            if (!review) {
                return res.render('reviews/detail', { 
                    review: null, 
                    book: null,
                    messages: { error: 'Review not found' }
                });
            }
            const book = await bookService.getBookById(review.book_id);
            res.render('reviews/detail', { review, book });
        } catch (error) {
            console.error('Error fetching review details:', error);
            res.render('reviews/detail', { 
                review: null, 
                book: null,
                messages: { error: 'Failed to load review details' }
            });
        }
    },

    // Display review edit form
    editForm: async (req, res) => {
        try {
            // Make sure the review ID is an integer
            const reviewId = parseInt(req.params.id);
            const review = await reviewService.getReviewById(reviewId);
            
            if (!review) {
                return res.redirect('/reviews?message=Review not found');
            }
            
            const books = await bookService.getAllBooks();
            res.render('reviews/edit', { review, books });
        } catch (error) {
            console.error('Error fetching review for editing:', error);
            res.redirect('/reviews?message=Error loading review');
        }
    },

    // Handle review update
    update: async (req, res) => {
        try {
            const reviewId = parseInt(req.params.id);
            const reviewData = {
                id: reviewId,
                book_id: parseInt(req.body.book_id),
                rating: parseFloat(req.body.rating),
                review_text: req.body.review_text,
                reviewer_name: req.body.reviewer_name,
                updated_at: new Date().toISOString()
            };
            
            const updated = await reviewService.updateReview(reviewId, reviewData);
            
            if (!updated) {
                const books = await bookService.getAllBooks();
                return res.render('reviews/edit', { 
                    review: reviewData, 
                    books,
                    messages: { error: 'Review not found or could not be updated' }
                });
            }
            
            res.redirect(`/reviews/${reviewId}?message=Review updated successfully`);
        } catch (error) {
            console.error('Error updating review:', error);
            try {
                const books = await bookService.getAllBooks();
                res.render('reviews/edit', { 
                    review: req.body, 
                    books,
                    messages: { error: 'Failed to update review' }
                });
            } catch (e) {
                res.redirect(`/reviews/${req.params.id}?message=Error updating review`);
            }
        }
    },

    // Handle review delete
    delete: async (req, res) => {
        try {
            const reviewId = parseInt(req.params.id);
            const review = await reviewService.getReviewById(reviewId);
            
            if (!review) {
                return res.redirect('/reviews?message=Review not found');
            }
            
            const bookId = review.book_id; // Save book ID before deleting
            const deleted = await reviewService.deleteReview(reviewId);
            
            if (!deleted) {
                return res.redirect(`/reviews/${reviewId}?message=Failed to delete review`);
            }
            
            // If the request came from the book page, redirect back there
            if (req.headers.referer && req.headers.referer.includes(`/books/${bookId}`)) {
                return res.redirect(`/books/${bookId}?message=Review deleted successfully`);
            }
            
            res.redirect('/reviews?message=Review deleted successfully');
        } catch (error) {
            console.error('Error deleting review:', error);
            res.redirect(`/reviews/${req.params.id}?message=Error deleting review`);
        }
    }
};

module.exports = reviewController;