const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavoriteContact = require("./updateFavoriteContact");

module.exports = {
  getAllContacts,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
  updateFavoriteContact,
};
