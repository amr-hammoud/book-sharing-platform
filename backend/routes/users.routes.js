const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");

router.get("/", usersController.getAllUsers)
router.get("/:username", usersController.getUserByUsername)
router.post("/follow", usersController.followUser)
router.post("/unfollow", usersController.unfollowUser)
router.get("/followingPosts", usersController.getFollowingPosts)

module.exports = router;