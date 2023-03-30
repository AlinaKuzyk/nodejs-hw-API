const { Contact, schemas } = require("../../models/contact");

const addNewContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
