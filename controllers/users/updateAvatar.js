const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  try {
    const { _id } = req.user;
    const resultUpload = path.join(avatarsDir, originalname);

    await fs.rename(tempUpload, resultUpload);

     const avatarURL = path.join("public", "avatars", originalname);
     
     Jimp.read(resultUpload, (err, image) => {
       if (err) throw err;
       image.resize(250, 250).write(resultUpload);
     });

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
