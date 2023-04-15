const { User, joiRegisterSchema } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../helpers/sendMail");

const { HOST } = process.env;

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

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = uuidv4();

    const result = await User.create({
      avatarURL,
      email,
      password: hashPassword,
      verificationToken,
      subscription,
    });

    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `<a target="_blank" href="http://${HOST}/api/users/verify/${verificationToken}">Confirm</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
