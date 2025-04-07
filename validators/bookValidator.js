const { body, validationResult } = require('express-validator');

// Validation rules for book
const bookValidationRules = [
    //Setting minimum and maximum letters in titles
    body('title')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    //Setting minimum and maximum letters in authors
    body('author')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Author is required')
      .isLength({ max: 100 })
      .withMessage('Author name cannot exceed 100 characters'),
    //Setting minimum and maximum letters in titles and accepting only already wrtitten genres
    body('genre')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Genre is required')
      .isIn(['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 
             'Thriller', 'Romance', 'Historical Fiction', 'Memoir', 'Biography', 
             'Self-Help', 'Business', 'Other'])
      .withMessage('Please select a valid genre'),
    //Setting minimum and maximum year of publishing
    body('published_year')
      .isInt({ min: 1, max: new Date().getFullYear() })
      .withMessage(`Publication year must be between 1000 and ${new Date().getFullYear()}`),
    //Setting rule for checking ISBN sign
    body('isbn')
      .optional({ checkFalsy: true })
      .trim()
      // Validate ISBN. Reference: https://stackoverflow.com/questions/41271613/use-regex-to-verify-an-isbn-number
      .matches(/^(?:ISBN(?:-1[03])?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)(?:97[89][-\ ]?)?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]$/)
      .withMessage('Please enter a valid ISBN format (e.g., 978-3-16-148410-0)')
  ];

module.exports = bookValidationRules;