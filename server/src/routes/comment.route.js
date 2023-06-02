const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment.controller");

router.get("/comment", comment.getComment);

// router.post("/comments", comment.addComment);
// router.get("/comments", comment.getComments);
// router.delete("/comment", comment.deleteComment);

module.exports = router;
