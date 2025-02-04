const { verify } = require("jsonwebtoken");
const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw NotFound();
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      message: "Verify: success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
