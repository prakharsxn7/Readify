const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single book
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        publishedYear: req.body.publishedYear,
        ISBN: req.body.ISBN,
        genre: req.body.genre
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update fields that are passed in the request body
        if (req.body.title) book.title = req.body.title;
        if (req.body.author) book.author = req.body.author;
        if (req.body.summary) book.summary = req.body.summary;
        if (req.body.publishedYear) book.publishedYear = req.body.publishedYear;
        if (req.body.ISBN) book.ISBN = req.body.ISBN;
        if (req.body.genre) book.genre = req.body.genre;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.remove();
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Search books
exports.searchBooks = async (req, res) => {
    try {
        const books = await Book.find(
            { $text: { $search: req.params.query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
