const fs = require('fs').promises;

// Review Service handles business logic and data operations for reviews
const reviewService = {
    
    // Get all reviews from the database
    getAllReviews: async () => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData.reviews || [];
        } catch (error) {
            console.error('Error reading from database:', error);
            throw new Error('Failed to get reviews');
        }
    },
    
    // Get a single review by ID
    getReviewById: async (id) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData.reviews.find(review => review.id === id) || null;
        } catch (error) {
            console.error('Error reading from database:', error);
            throw new Error('Failed to get review');
        }
    },
    
    // Get all reviews for a specific book
    getReviewsByBookId: async (bookId) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData.reviews.filter(review => review.book_id === bookId) || [];
        } catch (error) {
            console.error('Error reading from database:', error);
            throw new Error('Failed to get reviews for book');
        }
    },
    
    // Create a new review
    createReview: async (reviewData) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            
            // Generate new ID
            const maxId = jsonData.reviews.length > 0 
                ? Math.max(...jsonData.reviews.map(review => review.id)) 
                : 100; // Starting from 101 for reviews
            
            const newReview = {
                id: maxId + 1,
                ...reviewData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            jsonData.reviews.push(newReview);
            
            await fs.writeFile(global.mock_db, JSON.stringify(jsonData, null, 2), 'utf8');
            return newReview;
        } catch (error) {
            console.error('Error writing to database:', error);
            throw new Error('Failed to create review');
        }
    },
    
    // Update an existing review
    updateReview: async (id, reviewData) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            
            const reviewIndex = jsonData.reviews.findIndex(review => review.id === id);
            
            if (reviewIndex === -1) {
                return false;
            }
            
            jsonData.reviews[reviewIndex] = {
                ...jsonData.reviews[reviewIndex],
                ...reviewData,
                updated_at: new Date().toISOString()
            };
            
            await fs.writeFile(global.mock_db, JSON.stringify(jsonData, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error updating database:', error);
            throw new Error('Failed to update review');
        }
    },
    
    // Delete a review
    deleteReview: async (id) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            
            const reviewIndex = jsonData.reviews.findIndex(review => review.id === id);
            
            if (reviewIndex === -1) {
                return false;
            }
            
            // Remove review from reviews array
            jsonData.reviews.splice(reviewIndex, 1);
            
            await fs.writeFile(global.mock_db, JSON.stringify(jsonData, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error updating database:', error);
            throw new Error('Failed to delete review');
        }
    }
};

module.exports = reviewService;