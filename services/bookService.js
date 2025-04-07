const fs = require('fs').promises;
const path = require('path');

// Book Service handles business logic and data operations
const bookService = {
    
    // Get all books from the database
    getAllBooks: async () => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData.books || [];
        } catch (error) {
            console.error('Error reading from database:', error);
            throw new Error('Failed to get books');
        }
    },
    
    // Get a single book by ID
    getBookById: async (id) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData.books.find(book => book.id === id) || null;
        } catch (error) {
            console.error('Error reading from database:', error);
            throw new Error('Failed to get book');
        }
    },
    
    // Create a new book
    createBook: async (bookData) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            
            // Generate new ID
            const maxId = jsonData.books.length > 0 
                ? Math.max(...jsonData.books.map(book => book.id)) 
                : 0;
            
            const newBook = {
                id: maxId + 1,
                ...bookData
            };
            
            jsonData.books.push(newBook);
            
            await fs.writeFile(global.mock_db, JSON.stringify(jsonData, null, 2), 'utf8');
            return newBook;
        } catch (error) {
            console.error('Error writing to database:', error);
            throw new Error('Failed to create book');
        }
    },
    
    // Update an existing book
    updateBook: async (id, bookData) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            
            const bookIndex = jsonData.books.findIndex(book => book.id === id);
            
            if (bookIndex === -1) {
                return false;
            }
            
            jsonData.books[bookIndex] = {
                ...jsonData.books[bookIndex],
                ...bookData
            };
            
            await fs.writeFile(global.mock_db, JSON.stringify(jsonData, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error updating database:', error);
            throw new Error('Failed to update book');
        }
    },
    
    // Delete a book
    deleteBook: async (id) => {
        try {
            const data = await fs.readFile(global.mock_db, 'utf8');
            const jsonData = JSON.parse(data);
            
            const bookIndex = jsonData.books.findIndex(book => book.id === id);
            
            if (bookIndex === -1) {
                return false;
            }
            
            // Remove book from books array
            jsonData.books.splice(bookIndex, 1);
            
            // Also delete all reviews for this book
            jsonData.reviews = jsonData.reviews.filter(review => review.book_id !== id);
            
            await fs.writeFile(global.mock_db, JSON.stringify(jsonData, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error updating database:', error);
            throw new Error('Failed to delete book');
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
            throw new Error('Failed to get reviews');
        }
    }
};

module.exports = bookService;