const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");

router.get("/", usersController.getAllUsers)
router.post("/follow", usersController.followUser)
router.post("/unfollow", usersController.unfollowUser)

module.exports = router;