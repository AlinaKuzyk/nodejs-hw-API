const express = require("express");

const { users: controllers } = require("../../controllers");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.get("/current", auth, controllers.getCurrentUser);

module.exports = router;
