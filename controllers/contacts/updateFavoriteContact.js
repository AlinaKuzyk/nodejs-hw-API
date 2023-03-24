const { Contact, schemas } = require("../../models/contact");
const createError = require("http-errors");

const updateFavoriteContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { isFavorite = false } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { isFavorite });
    if (!result) {
      throw createError(404, `Not found contact with id=${contactId}`);
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

module.exports = updateFavoriteContact;
