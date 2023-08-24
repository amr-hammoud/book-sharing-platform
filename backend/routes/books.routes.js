const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controllers");

router.get("/", booksController.getAllBooks)
router.get("/:id", booksController.getBook)
router.post("/create", booksController.createBook)

module.exports = router;