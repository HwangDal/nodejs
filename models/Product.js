const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String },
    author: { type: String },
    year: { type: Number },
    price: { type: Number },
    isbn: { type: String },
    review_count: { type: Number },
    average_score: { type: Number },
    image: { type: String }
})

module.exports = mongoose.model('Product', productSchema);
