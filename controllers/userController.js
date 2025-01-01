const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getProfile = async (req, res, next) => {};

exports.updateProfile = async (req, res, next) => {};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    if (!email || !password || !newPassword)
      throw new AppError("No parameters sent", 400);

    const user = await User.findOne({ email }).select("password");

    if (!user)
      throw new AppError(
        "The user with this given email cant not be found!",
        400
      );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("wrong password!", 400);

    user.password = await bcrypt.hash(newPassword, saltrounds);

    await user.save();

    res.status(200).json({
      status: "sucess",
      message: "password changed",
    });
  } catch (err) {
    next(err);
  }
};
