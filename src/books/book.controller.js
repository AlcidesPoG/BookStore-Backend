const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (err) {
    console.error("Error creating book: ", err);
    res.status(500).send({ message: "Error creating book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (err) {
    console.error("Error fetching books: ", err);
    res.status(500).send({ message: "Error looking for books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send(book);
  } catch (err) {
    console.error("Error fetching books: ", err);
    res.status(500).send({ message: "Error looking for book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).send({ message: "Book was not found" });
    }
    return res
      .status(200)
      .send({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    console.error("Error updating a books: ", err);
    res.status(500).send({ message: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).send({ message: "Book was not found" });
    }
    return res
      .status(200)
      .send({ message: "Book deleted successfully", book: deleteBook });
  } catch (err) {
    console.error("Error updating a books: ", err);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
