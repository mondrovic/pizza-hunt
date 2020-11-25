const router = require("express").Router();

const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

// uses pizzaId as param to post addComment method
router.route("/:pizzaId").post(addComment);
// uses pizzaId -> commentId to delete
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;
