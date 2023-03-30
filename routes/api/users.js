const express = require("express");

const { users: controllers } = require("../../controllers");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/logout", auth, controllers.logout);

module.exports = router;
