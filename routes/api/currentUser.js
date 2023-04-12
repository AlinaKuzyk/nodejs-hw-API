const express = require("express");

const { users: controllers } = require("../../controllers");
const { auth } = require("../../middleware/auth");
const { upload } = require("../../middleware/upload");

const router = express.Router();

router.get("/current", auth, controllers.getCurrentUser);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
