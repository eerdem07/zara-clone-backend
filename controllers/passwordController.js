const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const crypto = require("crypto");

const sendMail = require("../utils/mail");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new AppError("no mail sent", 400);

    const user = await User.findOne({ email });

    if (!user) throw new AppError("user can not be found", 400);

    const token = crypto.randomBytes(20).toString("hex");

    const url = `http://wwww.${process.env.HOST}:${process.env.PORT}/resetPassword/${token}`;

    sendMail(user.email, "resetPassword", "Here is your URL", url);

    user.passwordResetToken = token;
    user.passwordResetTokenExpires = Date.now() + 3600000;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Mail sent",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params.token;

    if (!token || !newPassword) {
      throw new AppError("Email or Token isnt provided!", 400);
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) throw new AppError("User cant be found!", 400);

    const hashedPassword = await bcrypt.hash(password, saltrounds);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    res.status(201).json({
      status: "Success",
      message: "Password succesfully changed!",
    });
  } catch (err) {
    next(err);
  }
};
