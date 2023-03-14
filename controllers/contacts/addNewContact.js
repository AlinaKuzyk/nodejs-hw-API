const contacts = require("../../models/contacts");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const addNewContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewContact,
};
