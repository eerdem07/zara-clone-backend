const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

const sendMail = require("../utils/mail");

const bcrypt = require("bcrypt");
const saltrounds = 15;

const AppError = require("../utils/AppError");

const createJWT = (payload) => {
  return jsonwebtoken.sign({ _id: payload }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("password");

    if (!user) throw new AppError("please fullfil email or password", 400);

    const valid = await bcrypt.compare(password, user.password);

    const token = createJWT(user._id.toString());

    if (valid) {
      res
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 600000,
          sameSite: "strict",
        })
        .status(200)
        .json({
          status: "succcess",
          message: "succesfully logged in!",
        });
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "email or password wrong" });
    }
  } catch (err) {
    next(err);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { name, surname, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    res
      .status(201)
      .json({ status: "success", message: "User successfully registered" });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", "", { expiresIn: new Date(0) });
  res
    .status(200)
    .json({ status: "success", message: "successfully logged out!" });
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    if (!email || !password || !newPassword)
      throw new AppError("no parameters sent", 400);

    const user = await User.findOne({ email }).select("password");

    if (!user)
      throw new AppError(
        "the user with this given email cant not be found!",
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

exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email) throw new AppError("no mail sent", 400);

    const user = await User.findOne({ email });

    if (!user) throw new AppError("user can not be found", 400);

    // sendMail(email, "resetPassword", otp, `<h1>Here is your ${otp} code</h1>`);

    res.status(200).json({
      status: "success",
      message: "mail sended",
    });
  } catch (err) {
    next(err);
  }
};
