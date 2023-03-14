const contacts = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
};
