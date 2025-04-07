const { Router } = require('express');
const reviewController = require('../controllers/reviewController');
const router = Router();

// Display list of all reviews
router.get('/', reviewController.list);

// Display review creation form
router.get('/create', reviewController.createForm);

// Handle review creation
router.post('/store', reviewController.store);

// Display single review details
router.get('/:id', reviewController.show);

// Display review edit form
router.get('/:id/edit', reviewController.editForm);

// Handle review update
router.post('/:id/update', reviewController.update);

// Handle review delete
router.post('/:id/delete', reviewController.delete);

module.exports = router;