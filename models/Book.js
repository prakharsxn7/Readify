const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

module.exports = mongoose.model('Book', bookSchema);