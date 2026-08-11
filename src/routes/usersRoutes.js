const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserStatus,
} = require("../controllers/usersController");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const { createUserSchema } = require("../validators/userValidator");

router.get("/", authenticate, authorize("admin"), getUsers);

router.get("/:id", authenticate, getUserById);

router.post(
  "/",
  validate(createUserSchema),
  createUser
);

router.patch(
  "/:id/status",
  authenticate,
 authorize("admin"),
  updateUserStatus
);

module.exports = router;