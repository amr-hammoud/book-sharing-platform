const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controllers");

router.get("/", booksController.getAllBooks)
router.get("/:id", booksController.getBook)
router.post("/create", booksController.createBook)
router.post("/like", booksController.likeBook)
router.post("/unlike", booksController.unlikeBook)
router.post("/search", booksController.searchBooks)

module.exports = router;