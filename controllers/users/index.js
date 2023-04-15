const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
};
