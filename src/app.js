const router = require("express").Router(); // import express router
const books = require('./models/books.json'); // import data

let booksDirectory = books; // allows us to modify the data

router.route('/books')
.get( (req, res) => { // Get all books from API
    res.send(booksDirectory); // send back books from API to client
})
.post( (req, res) => { // Create new resource to API
    const {
        id,
        name,
        author
    } = req.body; // destructure data and assign to the fields

    const bookExists = booksDirectory.find( b => b.id === id);

    // Check if the book already exists
    if (bookExists) return res.send('Book already exists.');

    // Otherwise, create the resource
    const book = {
        id,
        name,
        author
    };

    booksDirectory.push(book); // add book to the array
    res.send(book); // send book back to client
})

router.route('/books/:id')
.get( (req, res) => {
    const { id } = req.params;
    const book = booksDirectory.find( b => b.id === id);

    if (!book) return res.status(404).send(`Book with ID: ${id} does not exist.`);
    res.send(book);
})
.put( (req, res) => {
    const { id } = req.params; // get id from param
    const {
        name,
        author
    } = req.body; // gather name and author from body and assign

    const book = booksDirectory.find( b => b.id === id);

    // Check if we're trying to update a book that doesn't exist
    if (!book) return res.send('Book does not exist');

    // Otherwise, update the fields
    /**
     * Function which checks if value is undefined
     *  If true, returns the previous value
     *  Else, return the value 
     **/
    const updateField = (val, prev) => !val ? prev: val;

    const updatedBook = {
        ...book,
        id: updateField(id, book.id),
        name: updateField(name, book.name),
        author: updateField(author, book.author)
    };

    // Find index of the book we are updating
    const bookIndex = booksDirectory.findIndex( b => b.id === id );
    // Remove the book at the index, and insert with the updated book
    booksDirectory.splice(bookIndex, 1, updateField);

    res.send(updatedBook);
})
.delete( (req, res) => {
    const { id } = req.params;
    // Find book that matches the id param
    let book = booksDirectory.find( b => b.id === id);

    // If book is undefined, return 404
    if (!book) return res.status(404).send('Book does not exist');

    // Otherwise, delete the book
    booksDirectory = booksDirectory.filter( b => b.id != id );

    res.send('Successfully deleted.');
});

module.exports = router;