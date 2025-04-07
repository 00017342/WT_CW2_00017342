const { Router } = require('express');
const bookController = require('../controllers/bookController');
const router = Router();

const bookValidationRules = require('../validators/bookValidator');

// Display list of all books
router.get('/', bookController.list);

// Display book creation form
router.get('/create', bookController.createForm);

// Handle book creation
router.post('/store', bookValidationRules, bookController.validateBook, bookController.store);

// Display single book details
router.get('/:id', bookController.show);

// Display book edit form
router.get('/:id/edit', bookController.editForm);

// Handle book update
router.post('/:id/update', bookValidationRules, bookController.validateBook, bookController.update);

// Handle book delete
router.post('/:id/delete', bookController.delete);

module.exports = router;