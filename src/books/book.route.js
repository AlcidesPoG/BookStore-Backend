const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const router = express.Router();

//post a book
router.post("/create-book", verifyAdminToken, postABook);

// get all books
router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.put("/edit/:id", verifyAdminToken, updateBook);

router.delete("/delete/:id", verifyAdminToken, deleteBook);

module.exports = router;
