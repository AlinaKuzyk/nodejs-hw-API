const express = require("express");
const contacts = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");

// создаем "книгу маршрутов"
const router = express.Router();

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

// GET api/contacts - путь, который прописан в АРР
router.get("/", async (req, res, next) => {
  // const result = await contacts.listContacts();
  // самый простой, но не самый правильный вариант
  // res.json(result)
  try {
    const result = await contacts.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    //   функция next будет искать обработчик с 4-мя параметрами и найдет ее в файле АРР на 22 строке
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  // все динамические части хранятся в request.params
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    //   в запросах с ID обязательно делать проверку!
    if (!result) {
      //  создаем новую ошибку с нужным для нас статусом и далее пробрасываем ее в catch, где она перейдет в файл АРР
      // const error = new Error(`There is no contact with id=${contactId}`);
      // error.status = 404;
      //  или при помощь библиотеки
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
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
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
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    console.log(contactId);
    const result = await contacts.updateContact(contactId, req.body);
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
});

module.exports = router;
