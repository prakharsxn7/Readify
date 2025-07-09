const express = require('express');
const router = express.Router();
const bookcontroller = require('../controllers/books');

router.get('/', bookcontroller.getAllBooks);
router.post('/', bookcontroller.createBook);
router.get('/:id', bookcontroller.getBook);
router.put('/:id', bookcontroller.updateBook);
router.delete('/:id', bookcontroller.deleteBook);


router.get('/search/:query', bookcontroller.searchBooks);

module.exports = router;