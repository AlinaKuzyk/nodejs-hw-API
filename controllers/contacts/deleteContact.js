const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, `There is no contact with id=${contactId}`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
