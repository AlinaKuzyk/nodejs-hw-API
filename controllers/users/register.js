const { User, joiRegisterSchema } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`User with email ${email} is already registered`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
