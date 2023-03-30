const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find(
      favorite ? { owner: _id, favorite } : { owner: _id },
      "",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id email name");
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
