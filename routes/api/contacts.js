const express = require("express");

const { contacts: controllers } = require("../../controllers");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.get("/", auth, controllers.getAllContacts);

router.get("/:contactId", controllers.getById);

router.post("/", auth, controllers.addNewContact);

router.delete("/:contactId", controllers.deleteContact);

router.put("/:contactId", controllers.updateContact);

router.patch("/:contactId/favorite", controllers.updateFavoriteContact);

module.exports = router;
