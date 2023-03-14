const express = require("express");

const { contacts: controllers } = require("../../controllers");

const router = express.Router();

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getById);

router.post("/", controllers.addNewContact);

router.delete("/:contactId", controllers.deleteContact);

router.put("/:contactId", controllers.updateContact);

module.exports = router;
