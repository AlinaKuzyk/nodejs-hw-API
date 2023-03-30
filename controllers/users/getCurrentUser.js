const { User } = require("../../models/user");

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    req.status(200).json({
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

module.exports = getCurrentUser;
